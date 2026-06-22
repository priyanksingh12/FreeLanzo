const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const formatted = errors.array().map((e) => ({
    field: e.path,
    message: e.msg,
  }));

  // Surface the first message at the top level so the frontend's existing
  // single-string error UI (validationError / error) keeps working as-is.
  next(new ApiError(422, formatted[0].message, formatted));
};

module.exports = validate;
