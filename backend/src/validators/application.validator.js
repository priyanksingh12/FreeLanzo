const { body } = require("express-validator");

const applyValidator = [
  body("proposalText").trim().notEmpty().withMessage("Proposal text is required"),
  body("expectedBudget").isFloat({ min: 0 }).withMessage("Expected budget must be a positive number"),
  body("estimatedCompletionDays").isInt({ min: 1 }).withMessage("Estimated completion time is required"),
];

const updateApplicationStatusValidator = [
  body("status").isIn(["accepted", "rejected"]).withMessage("Status must be 'accepted' or 'rejected'"),
];

module.exports = { applyValidator, updateApplicationStatusValidator };
