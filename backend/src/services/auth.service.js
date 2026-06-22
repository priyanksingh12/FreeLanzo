
const User = require("../models/User.model");
const ApiError = require("../utils/ApiError");
const { verifyGoogleIdToken } = require("../utils/googleAuth");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

/**
 * Issues a fresh access + refresh token pair for a user and persists
 * the refresh token hash so it can later be verified/revoked.
 */
const issueTokens = async (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.setRefreshToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, "An account with this email already exists");
  }

  const user = await User.create({ name, email, password, provider: "local" });
  const tokens = await issueTokens(user);
  return { user, ...tokens };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user || user.provider !== "local") {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const tokens = await issueTokens(user);
  return { user, ...tokens };
};

/**
 * Logs a user in via Google, creating the account on first sign-in.
 * If an account with the same email already exists as a "local" account,
 * the Google identity is linked to it rather than creating a duplicate.
 */
const loginOrSignupWithGoogle = async (idToken) => {
  const profile = await verifyGoogleIdToken(idToken);

  let user = await User.findOne({
    $or: [{ googleId: profile.googleId }, { email: profile.email }],
  });

  if (!user) {
    user = await User.create({
      name: profile.name,
      email: profile.email,
      googleId: profile.googleId,
      avatarUrl: profile.avatarUrl,
      provider: "google",
      isVerified: true,
    });
  } else if (!user.googleId) {
    // Existing local account signing in with Google for the first time
    user.googleId = profile.googleId;
    user.avatarUrl = user.avatarUrl || profile.avatarUrl;
    user.isVerified = true;
    await user.save({ validateBeforeSave: false });
  }

  const tokens = await issueTokens(user);
  return { user, ...tokens };
};

const refreshTokens = async (oldRefreshToken, decodedUserId) => {
  const user = await User.findById(decodedUserId).select("+refreshTokenHash");
  if (!user || !user.compareRefreshToken(oldRefreshToken)) {
    throw new ApiError(401, "Refresh token is invalid or has been revoked");
  }

  const tokens = await issueTokens(user); // rotates the refresh token
  return { user, ...tokens };
};

const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshTokenHash: null });
};

module.exports = {
  registerUser,
  loginUser,
  loginOrSignupWithGoogle,
  refreshTokens,
  logoutUser,
};

