const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { createReviewValidator } = require("../validators/review.validator");
const { createReview } = require("../controllers/review.controller");

const router = express.Router();

router.post("/:jobId", protect, createReviewValidator, validate, createReview);

module.exports = router;
