const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const User = require("../models/User.model");
const WorkerProfile = require("../models/WorkerProfile.model");
const Review = require("../models/Review.model");
const SavedWorker = require("../models/SavedWorker.model");

// GET /api/v1/workers  (hirer — search/filter)
const searchWorkers = asyncHandler(async (req, res) => {
  const { skills, city, minRating, experienceLevel, minRate, maxRate, availability, page = 1, limit = 20 } =
    req.query;

  const userFilter = { role: "worker" };
  if (city) userFilter["location.city"] = city;

  const matchingUsers = await User.find(userFilter).select("_id");
  const userIds = matchingUsers.map((u) => u._id);

  const profileFilter = { user: { $in: userIds } };
  if (skills) profileFilter.skills = { $in: skills.split(",").map((s) => s.trim()) };
  if (experienceLevel) profileFilter.experienceLevel = experienceLevel;
  if (availability) profileFilter.availability = availability;
  if (minRating) profileFilter.rating = { $gte: Number(minRating) };
  if (minRate || maxRate) {
    profileFilter.hourlyRate = {};
    if (minRate) profileFilter.hourlyRate.$gte = Number(minRate);
    if (maxRate) profileFilter.hourlyRate.$lte = Number(maxRate);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [profiles, total] = await Promise.all([
    WorkerProfile.find(profileFilter)
      .populate("user", "name avatarUrl location")
      .sort("-rating")
      .skip(skip)
      .limit(Number(limit)),
    WorkerProfile.countDocuments(profileFilter),
  ]);

  res
    .status(200)
    .json(
      new ApiResponse(200, { workers: profiles, total, page: Number(page), limit: Number(limit) }, "Workers fetched")
    );
});

// GET /api/v1/workers/:workerId  (public)
const getWorkerProfile = asyncHandler(async (req, res) => {
  const { workerId } = req.params;
  const user = await User.findOne({ _id: workerId, role: "worker" });
  if (!user) throw new ApiError(404, "Worker not found");

  const profile = await WorkerProfile.findOne({ user: workerId });

  res.status(200).json(new ApiResponse(200, { user: user.toSafeJSON(), profile }, "Worker profile fetched"));
});

// GET /api/v1/workers/:workerId/reviews  (public)
const getWorkerReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ reviewee: req.params.workerId })
    .populate("reviewer", "name avatarUrl")
    .sort("-createdAt");

  res.status(200).json(new ApiResponse(200, { reviews }, "Reviews fetched"));
});

// POST /api/v1/workers/:workerId/save  (hirer)
const saveWorker = asyncHandler(async (req, res) => {
  await SavedWorker.findOneAndUpdate(
    { hirer: req.user._id, worker: req.params.workerId },
    {},
    { upsert: true, setDefaultsOnInsert: true }
  );
  res.status(200).json(new ApiResponse(200, null, "Worker saved"));
});

// DELETE /api/v1/workers/:workerId/save  (hirer)
const unsaveWorker = asyncHandler(async (req, res) => {
  await SavedWorker.findOneAndDelete({ hirer: req.user._id, worker: req.params.workerId });
  res.status(200).json(new ApiResponse(200, null, "Worker removed from saved list"));
});

// GET /api/v1/workers/saved  (hirer)
const getSavedWorkers = asyncHandler(async (req, res) => {
  const saved = await SavedWorker.find({ hirer: req.user._id }).populate("worker", "name avatarUrl location");
  res.status(200).json(new ApiResponse(200, { saved }, "Saved workers fetched"));
});

module.exports = { searchWorkers, getWorkerProfile, getWorkerReviews, saveWorker, unsaveWorker, getSavedWorkers };
