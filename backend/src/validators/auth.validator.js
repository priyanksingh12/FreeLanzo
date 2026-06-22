const { body } = require("express-validator");

const registerValidator = [
  body("name").trim().notEmpty().withMessage("Full Name is required"),
  body("email").trim().isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const loginValidator = [
  body("email").trim().isEmail().withMessage("Please enter a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

const googleAuthValidator = [
  body("idToken").notEmpty().withMessage("Google ID token is required"),
];

module.exports = { registerValidator, loginValidator, googleAuthValidator };
