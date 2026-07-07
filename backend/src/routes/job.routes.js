const express = require("express");
const { protect, restrictTo } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { createJobValidator } = require("../validators/job.validator");
const { applyValidator } = require("../validators/application.validator");
const {
  createJob,
  getJobs,
  getJobById,
  getRecommendedJobs,
  getMyPostedJobs,
  updateJob,
  closeJob,
  completeJob,
} = require("../controllers/job.controller");
const { applyToJob, getApplicationsForJob } = require("../controllers/application.controller");

const router = express.Router();

// Static paths MUST come before the "/:jobId" dynamic routes below,
// otherwise Express would try to treat "recommended"/"my-jobs" as a jobId.
router.get("/recommended", protect, restrictTo("worker"), getRecommendedJobs);
router.get("/my-jobs", protect, restrictTo("hirer"), getMyPostedJobs);

router.get("/", getJobs);
router.post("/", protect, restrictTo("hirer"), createJobValidator, validate, createJob);

router.get("/:jobId", getJobById);
router.patch("/:jobId", protect, restrictTo("hirer"), updateJob);
router.patch("/:jobId/close", protect, restrictTo("hirer"), closeJob);
router.patch("/:jobId/complete", protect, restrictTo("hirer"), completeJob);

router.post("/:jobId/applications", protect, restrictTo("worker"), applyValidator, validate, applyToJob);
router.get("/:jobId/applications", protect, restrictTo("hirer"), getApplicationsForJob);

module.exports = router;
