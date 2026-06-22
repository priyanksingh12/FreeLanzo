const jwt = require("jsonwebtoken");
const env = require("../config/env");

/**
 * Generates a short-lived access token carrying minimal user identity.
 */
const generateAccessToken = (user) =>
  jwt.sign(
    { sub: user._id.toString(), email: user.email, role: user.role },
    env.accessTokenSecret,
    { expiresIn: env.accessTokenExpiry }
  );

/**
 * Generates a long-lived refresh token. Only the user id is embedded —
 * the actual token value is also hashed and stored on the user document
 * so it can be revoked (single-session invalidation / logout-all-devices).
 */
const generateRefreshToken = (user) =>
  jwt.sign({ sub: user._id.toString() }, env.refreshTokenSecret, {
    expiresIn: env.refreshTokenExpiry,
  });

const verifyAccessToken = (token) => jwt.verify(token, env.accessTokenSecret);

const verifyRefreshToken = (token) => jwt.verify(token, env.refreshTokenSecret);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
