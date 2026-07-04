const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const Job = require("../models/Job.model");
const Application = require("../models/Application.model");

// POST /api/v1/jobs/:jobId/applications  (worker)
const applyToJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const { proposalText, expectedBudget, estimatedCompletionDays, portfolioSamples } = req.body;

  const job = await Job.findById(jobId);
  if (!job) throw new ApiError(404, "Job not found");
  if (job.status !== "open") throw new ApiError(400, "This job is no longer accepting applications");

  const existing = await Application.findOne({ job: jobId, worker: req.user._id });
  if (existing) throw new ApiError(409, "You have already applied to this job");

  const application = await Application.create({
    job: jobId,
    worker: req.user._id,
    proposalText,
    expectedBudget,
    estimatedCompletionDays,
    portfolioSamples: portfolioSamples || [],
  });

  res.status(201).json(new ApiResponse(201, { application }, "Proposal submitted"));
});

// GET /api/v1/applications/my-applications  (worker)
const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ worker: req.user._id })
    .populate("job", "title budget status deadline")
    .sort("-createdAt");

  res.status(200).json(new ApiResponse(200, { applications }, "Your applications"));
});

// GET /api/v1/jobs/:jobId/applications  (hirer, owner only)
const getApplicationsForJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId);
  if (!job) throw new ApiError(404, "Job not found");
  if (job.hirer.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can only view applications for your own job postings");
  }

  const applications = await Application.find({ job: jobId })
    .populate("worker", "name avatarUrl")
    .sort("-createdAt");

  res.status(200).json(new ApiResponse(200, { applications }, "Applications fetched"));
});

// PATCH /api/v1/applications/:applicationId/status  (hirer, owner only)
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body; // "accepted" | "rejected"

  const application = await Application.findById(applicationId).populate("job");
  if (!application) throw new ApiError(404, "Application not found");

  const job = application.job;
  if (job.hirer.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can only manage applications for your own job postings");
  }

  application.status = status;
  await application.save();

  if (status === "accepted") {
    job.hiredWorker = application.worker;
    job.status = "in_progress";
    await job.save();

    // Auto-reject all other pending applications for this job.
    await Application.updateMany(
      { job: job._id, _id: { $ne: application._id }, status: "pending" },
      { status: "rejected" }
    );
  }

  res.status(200).json(new ApiResponse(200, { application }, "Application status updated"));
});

module.exports = { applyToJob, getMyApplications, getApplicationsForJob, updateApplicationStatus };
