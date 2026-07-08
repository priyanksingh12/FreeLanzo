const { body } = require("express-validator");

const createJobValidator = [
  body("title").trim().notEmpty().withMessage("Job title is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("requiredSkills").isArray({ min: 1 }).withMessage("Select at least one required skill"),
  body("budget").isFloat({ min: 0 }).withMessage("Budget must be a positive number"),
  body("deadline").isISO8601().withMessage("Deadline must be a valid date"),
  body("location.city").trim().notEmpty().withMessage("City is required"),
];

module.exports = { createJobValidator };
