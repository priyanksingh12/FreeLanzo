const express = require("express");
const rateLimit = require("express-rate-limit");
const {
  register,
  login,
  googleAuth,
  refreshToken,
  logout,
  getCurrentUser,
} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  registerValidator,
  loginValidator,
  googleAuthValidator,
} = require("../validators/auth.validator");

const router = express.Router();

// Throttle brute-force attempts on credential endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { success: false, message: "Too many attempts, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/register", authLimiter, registerValidator, validate, register);
router.post("/login", authLimiter, loginValidator, validate, login);
router.post("/google", authLimiter, googleAuthValidator, validate, googleAuth);
router.post("/refresh-token", refreshToken);
router.post("/logout", protect, logout);
router.get("/me", protect, getCurrentUser);

module.exports = router;



