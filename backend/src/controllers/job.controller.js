const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const Job = require("../models/Job.model");
const Application = require("../models/Application.model");
const WorkerProfile = require("../models/WorkerProfile.model");

// POST /api/v1/jobs  (hirer)
const createJob = asyncHandler(async (req, res) => {
  const { title, category, description, requiredSkills, budget, deadline, location, experienceLevelRequired } =
    req.body;

  const job = await Job.create({
    hirer: req.user._id,
    title,
    category,
    description,
    requiredSkills,
    budget,
    deadline,
    location,
    experienceLevelRequired,
  });

  res.status(201).json(new ApiResponse(201, { job }, "Job posted successfully"));
});

// GET /api/v1/jobs  (public browse/search)
const getJobs = asyncHandler(async (req, res) => {
  const { skills, city, minBudget, maxBudget, experienceLevel, page = 1, limit = 20 } = req.query;

  const filter = { status: "open" };
  if (skills) filter.requiredSkills = { $in: skills.split(",").map((s) => s.trim()) };
  if (city) filter["location.city"] = city;
  if (experienceLevel) filter.experienceLevelRequired = experienceLevel;
  if (minBudget || maxBudget) {
    filter.budget = {};
    if (minBudget) filter.budget.$gte = Number(minBudget);
    if (maxBudget) filter.budget.$lte = Number(maxBudget);
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [jobs, total] = await Promise.all([
    Job.find(filter).populate("hirer", "name avatarUrl").sort("-createdAt").skip(skip).limit(Number(limit)),
    Job.countDocuments(filter),
  ]);

  res
    .status(200)
    .json(new ApiResponse(200, { jobs, total, page: Number(page), limit: Number(limit) }, "Jobs fetched"));
});

// GET /api/v1/jobs/:jobId  (public)
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId).populate("hirer", "name avatarUrl");
  if (!job) throw new ApiError(404, "Job not found");
  res.status(200).json(new ApiResponse(200, { job }, "Job fetched"));
});

// GET /api/v1/jobs/recommended  (worker)
const getRecommendedJobs = asyncHandler(async (req, res) => {
  const workerProfile = await WorkerProfile.findOne({ user: req.user._id });
  const skills = workerProfile?.skills || [];

  const appliedJobIds = await Application.find({ worker: req.user._id }).distinct("job");

  const jobs = await Job.find({
    status: "open",
    requiredSkills: { $in: skills },
    _id: { $nin: appliedJobIds },
  })
    .populate("hirer", "name avatarUrl")
    .sort("-createdAt")
    .limit(20);

  res.status(200).json(new ApiResponse(200, { jobs }, "Recommended jobs fetched"));
});

// GET /api/v1/jobs/my-jobs  (hirer)
const getMyPostedJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ hirer: req.user._id }).sort("-createdAt");
  res.status(200).json(new ApiResponse(200, { jobs }, "Your posted jobs"));
});

// PATCH /api/v1/jobs/:jobId  (hirer, owner only)
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) throw new ApiError(404, "Job not found");
  if (job.hirer.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can only edit your own job postings");
  }

  const allowedFields = [
    "title",
    "category",
    "description",
    "requiredSkills",
    "budget",
    "deadline",
    "location",
    "experienceLevelRequired",
  ];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) job[field] = req.body[field];
  });

  await job.save();
  res.status(200).json(new ApiResponse(200, { job }, "Job updated"));
});

// PATCH /api/v1/jobs/:jobId/close  (hirer, owner only)
const closeJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) throw new ApiError(404, "Job not found");
  if (job.hirer.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can only close your own job postings");
  }
  job.status = "closed";
  await job.save();
  res.status(200).json(new ApiResponse(200, { job }, "Job closed"));
});

// PATCH /api/v1/jobs/:jobId/complete  (hirer, owner only)
const completeJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) throw new ApiError(404, "Job not found");
  if (job.hirer.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can only complete your own job postings");
  }
  if (job.status !== "in_progress") {
    throw new ApiError(400, "Only an in-progress job can be marked completed");
  }

  job.status = "completed";
  await job.save();

  // Simplified earnings model — full job budget is credited to the hired
  // worker on completion. Replace with real payment/escrow logic later.
  if (job.hiredWorker) {
    await WorkerProfile.findOneAndUpdate(
      { user: job.hiredWorker },
      { $inc: { completedJobs: 1, totalEarnings: job.budget } }
    );
  }

  res.status(200).json(new ApiResponse(200, { job }, "Job marked as completed"));
});

module.exports = {
  createJob,
  getJobs,
  getJobById,
  getRecommendedJobs,
  getMyPostedJobs,
  updateJob,
  closeJob,
  completeJob,
};
