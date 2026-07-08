const { body } = require("express-validator");

const createReviewValidator = [
  body("overallRating").isFloat({ min: 1, max: 5 }).withMessage("Overall rating must be between 1 and 5"),
  body("comment").optional().isLength({ max: 1000 }).withMessage("Comment is too long"),
];

module.exports = { createReviewValidator };
