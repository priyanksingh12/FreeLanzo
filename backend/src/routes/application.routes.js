const express = require("express");
const { protect, restrictTo } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { updateApplicationStatusValidator } = require("../validators/application.validator");
const { getMyApplications, updateApplicationStatus } = require("../controllers/application.controller");

const router = express.Router();

router.get("/my-applications", protect, restrictTo("worker"), getMyApplications);
router.patch(
  "/:applicationId/status",
  protect,
  restrictTo("hirer"),
  updateApplicationStatusValidator,
  validate,
  updateApplicationStatus
);

module.exports = router;
