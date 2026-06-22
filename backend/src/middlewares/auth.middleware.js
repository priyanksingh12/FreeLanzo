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

module.exports = { protect };
