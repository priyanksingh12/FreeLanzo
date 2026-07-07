const express = require("express");
const { protect, restrictTo } = require("../middlewares/auth.middleware");
const {
  searchWorkers,
  getWorkerProfile,
  getWorkerReviews,
  saveWorker,
  unsaveWorker,
  getSavedWorkers,
} = require("../controllers/worker.controller");

const router = express.Router();

// Static path before "/:workerId" for the same reason as in job.routes.js
router.get("/saved", protect, restrictTo("hirer"), getSavedWorkers);

router.get("/", protect, restrictTo("hirer"), searchWorkers);
router.get("/:workerId", getWorkerProfile);
router.get("/:workerId/reviews", getWorkerReviews);
router.post("/:workerId/save", protect, restrictTo("hirer"), saveWorker);
router.delete("/:workerId/save", protect, restrictTo("hirer"), unsaveWorker);

module.exports = router;
