const { OAuth2Client } = require("google-auth-library");
const env = require("../config/env");
const ApiError = require("./ApiError");

const client = new OAuth2Client(env.googleClientId);

/**
 * Verifies a Google ID token (the credential returned by Google Identity
 * Services / "Sign in with Google" button on the frontend) and returns
 * the decoded, trustworthy payload.
 *
 * Frontend flow this pairs with:
 *   1. Render Google's button, get back a `credential` (ID token) string.
 *   2. POST { idToken: credential } to /api/v1/auth/google
 *
 * @param {string} idToken
 * @returns {Promise<{googleId: string, email: string, name: string, avatarUrl: string, emailVerified: boolean}>}
 */
const verifyGoogleIdToken = async (idToken) => {
  if (!idToken) {
    throw new ApiError(400, "Google ID token is required");
  }

  let ticket;
  try {
    ticket = await client.verifyIdToken({
      idToken,
      audience: env.googleClientId,
    });
  } catch (err) {
    throw new ApiError(401, "Invalid or expired Google token");
  }

  const payload = ticket.getPayload();

  if (!payload || !payload.email) {
    throw new ApiError(401, "Could not retrieve account info from Google");
  }

  if (!payload.email_verified) {
    throw new ApiError(401, "Google email is not verified");
  }

  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name || payload.email.split("@")[0],
    avatarUrl: payload.picture || null,
    emailVerified: payload.email_verified,
  };
};

module.exports = { verifyGoogleIdToken };
