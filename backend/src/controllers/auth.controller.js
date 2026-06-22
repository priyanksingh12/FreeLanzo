
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const env = require("../config/env");
const authService = require("../services/auth.service");
const { verifyRefreshToken } = require("../utils/token");

const REFRESH_COOKIE_NAME = "refreshToken";

const refreshCookieOptions = {
  httpOnly: true,
  secure: env.isProd,
  sameSite: env.isProd ? "none" : "lax",
  path: "/api/v1/auth", // only sent to auth routes
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const sendAuthResponse = (res, statusCode, message, user, accessToken, refreshToken) => {
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions);
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, { user: user.toSafeJSON(), accessToken }, message));
};

// POST /api/v1/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.registerUser({
    name,
    email,
    password,
  });
  sendAuthResponse(res, 201, "Account created successfully", user, accessToken, refreshToken);
});

// POST /api/v1/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await authService.loginUser({ email, password });
  sendAuthResponse(res, 200, "Logged in successfully", user, accessToken, refreshToken);
});

// POST /api/v1/auth/google
// Body: { idToken: "<credential from Google Identity Services>" }
const googleAuth = asyncHandler(async (req, res) => {
  const { idToken } = req.body;
  const { user, accessToken, refreshToken } = await authService.loginOrSignupWithGoogle(idToken);
  sendAuthResponse(res, 200, "Logged in with Google successfully", user, accessToken, refreshToken);
});

// POST /api/v1/auth/refresh-token
const refreshToken = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies?.[REFRESH_COOKIE_NAME];
  if (!incomingToken) {
    throw new ApiError(401, "No refresh token provided");
  }

  const decoded = verifyRefreshToken(incomingToken); // throws if invalid/expired
  const { user, accessToken, refreshToken: newRefreshToken } = await authService.refreshTokens(
    incomingToken,
    decoded.sub
  );

  sendAuthResponse(res, 200, "Token refreshed", user, accessToken, newRefreshToken);
});

// POST /api/v1/auth/logout
const logout = asyncHandler(async (req, res) => {
  if (req.user) {
    await authService.logoutUser(req.user._id);
  }
  res.clearCookie(REFRESH_COOKIE_NAME, { path: "/api/v1/auth" });
  res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
});

// GET /api/v1/auth/me
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { user: req.user.toSafeJSON() }, "Current user"));
});

module.exports = { register, login, googleAuth, refreshToken, logout, getCurrentUser };

