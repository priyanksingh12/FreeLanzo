const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const Job = require("../models/Job.model");
const Review = require("../models/Review.model");
const WorkerProfile = require("../models/WorkerProfile.model");
const HirerProfile = require("../models/HirerProfile.model");

// POST /api/v1/reviews/:jobId
const createReview = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const { overallRating, comment, ...ratingFields } = req.body;

  const job = await Job.findById(jobId);
  if (!job) throw new ApiError(404, "Job not found");
  if (job.status !== "completed") {
    throw new ApiError(400, "You can only leave a review after the job is marked completed");
  }

  const isHirer = job.hirer.toString() === req.user._id.toString();
  const isWorker = job.hiredWorker && job.hiredWorker.toString() === req.user._id.toString();

  if (!isHirer && !isWorker) {
    throw new ApiError(403, "You are not a participant on this job");
  }

  const reviewee = isHirer ? job.hiredWorker : job.hirer;
  const reviewerRole = isHirer ? "hirer" : "worker";

  const existing = await Review.findOne({ job: jobId, reviewer: req.user._id });
  if (existing) throw new ApiError(409, "You have already reviewed this job");

  const review = await Review.create({
    job: jobId,
    reviewer: req.user._id,
    reviewee,
    reviewerRole,
    ratings: ratingFields,
    overallRating,
    comment,
  });

  // Recompute the reviewee's average rating from all their reviews so far.
  const allReviews = await Review.find({ reviewee });
  const avgRating = allReviews.reduce((sum, r) => sum + r.overallRating, 0) / allReviews.length;

  if (reviewerRole === "hirer") {
    // A hirer reviewed a worker -> update that worker's profile rating.
    await WorkerProfile.findOneAndUpdate({ user: reviewee }, { rating: avgRating });
  } else {
    // A worker reviewed a hirer -> update that hirer's profile rating.
    await HirerProfile.findOneAndUpdate({ user: reviewee }, { rating: avgRating });
  }

  res.status(201).json(new ApiResponse(201, { review }, "Review submitted"));
});

module.exports = { createReview };
