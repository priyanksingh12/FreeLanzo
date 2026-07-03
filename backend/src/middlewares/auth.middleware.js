const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { verifyAccessToken } = require("../utils/token");
const User = require("../models/User.model");

/**
 * Protects routes by requiring a valid access token, sent either as:
 *   Authorization: Bearer <token>   (recommended for SPA + axios)
 *   or an httpOnly "accessToken" cookie.
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw new ApiError(401, "Not authenticated — no token provided");
  }

  const decoded = verifyAccessToken(token); // throws if invalid/expired

  const user = await User.findById(decoded.sub);
  if (!user) {
    throw new ApiError(401, "User belonging to this token no longer exists");
  }

  req.user = user;
  next();
});

/**
 * Restricts a route to one or more roles. Must run AFTER `protect`,
 * since it depends on `req.user` already being set.
 * Usage: router.post("/", protect, restrictTo("hirer"), createJob);
 */
const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, `This action requires role: ${roles.join(" or ")}`));
  }
  next();
};

module.exports = { protect, restrictTo };
