const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const Job = require("../models/Job.model");
const Application = require("../models/Application.model");
const WorkerProfile = require("../models/WorkerProfile.model");

// GET /api/v1/dashboard/worker
const getWorkerDashboard = asyncHandler(async (req, res) => {
  const workerProfile = await WorkerProfile.findOne({ user: req.user._id });
  const skills = workerProfile?.skills || [];

  const appliedJobIds = await Application.find({ worker: req.user._id }).distinct("job");

  const recommendedJobs = await Job.find({
    status: "open",
    requiredSkills: { $in: skills },
    _id: { $nin: appliedJobIds },
  })
    .sort("-createdAt")
    .limit(10);

  const recentApplications = await Application.find({ worker: req.user._id })
    .populate("job", "title budget status")
    .sort("-createdAt")
    .limit(5);

  const activeProjects = await Job.countDocuments({ hiredWorker: req.user._id, status: "in_progress" });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        recommendedJobs,
        recentApplications,
        earnings: {
          totalEarnings: workerProfile?.totalEarnings || 0,
          completedJobs: workerProfile?.completedJobs || 0,
          activeProjects,
        },
      },
      "Worker dashboard data"
    )
  );
});

// GET /api/v1/dashboard/hirer
const getHirerDashboard = asyncHandler(async (req, res) => {
  const jobsPosted = await Job.countDocuments({ hirer: req.user._id });
  const activeProjects = await Job.countDocuments({ hirer: req.user._id, status: "in_progress" });

  const myJobIds = await Job.find({ hirer: req.user._id }).distinct("_id");
  const recentApplications = await Application.find({ job: { $in: myJobIds } })
    .populate("worker", "name avatarUrl")
    .populate("job", "title")
    .sort("-createdAt")
    .limit(5);

  res.status(200).json(
    new ApiResponse(200, { jobsPosted, activeProjects, recentApplications }, "Hirer dashboard data")
  );
});

module.exports = { getWorkerDashboard, getHirerDashboard };
