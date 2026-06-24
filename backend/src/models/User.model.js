
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      // Not required for Google-only accounts
      required: function () {
        return this.provider === "local";
      },
      minlength: 6,
      select: false,
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: {
      type: String,
      default: null,
      index: true,
      sparse: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["worker", "hirer", null],
      default: null,
    },
    onboardingStep: {
      type: String,
      enum: ["role", "location", "skills", "profile", "completed"],
      default: "role",
    },
    location: {
      country: { type: String, default: null },
      state: { type: String, default: null },
      city: { type: String, default: null },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Hash of the current valid refresh token (rotation + revocation support)
    refreshTokenHash: {
      type: String,
      default: null,
      select: false,
    },
  },
  { timestamps: true }
);

// Hash password before saving, only if it was modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Store only a hash of the refresh token, never the raw value
userSchema.methods.setRefreshToken = function (rawToken) {
  this.refreshTokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
};

userSchema.methods.compareRefreshToken = function (rawToken) {
  if (!this.refreshTokenHash) return false;
  const hash = crypto.createHash("sha256").update(rawToken).digest("hex");
  return hash === this.refreshTokenHash;
};

userSchema.methods.toSafeJSON = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    avatarUrl: this.avatarUrl,
    provider: this.provider,
    role: this.role,
    onboardingStep: this.onboardingStep,
    location: this.location,
    isVerified: this.isVerified,
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model("User", userSchema);
