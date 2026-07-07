const express = require("express");
const { protect, restrictTo } = require("../middlewares/auth.middleware");
const { getWorkerDashboard, getHirerDashboard } = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/worker", protect, restrictTo("worker"), getWorkerDashboard);
router.get("/hirer", protect, restrictTo("hirer"), getHirerDashboard);

module.exports = router;
