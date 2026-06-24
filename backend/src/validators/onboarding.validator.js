const { body } = require("express-validator");

const roleValidator = [
  body("role")
    .isIn(["worker", "hirer"])
    .withMessage("Role must be either 'worker' or 'hirer'"),
];

const locationValidator = [
  body("country").trim().notEmpty().withMessage("Country is required"),
  body("state").trim().notEmpty().withMessage("State is required"),
  body("city").trim().notEmpty().withMessage("City is required"),
];

const skillsValidator = [
  body("skills")
    .isArray({ min: 1 })
    .withMessage("Select at least one skill"),
];

module.exports = { roleValidator, locationValidator, skillsValidator };
