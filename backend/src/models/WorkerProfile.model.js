const mongoose = require("mongoose");

const workerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    bio: { type: String, maxlength: 1000, default: "" },
    skills: [{ type: String, trim: true }],
    experienceLevel: {
      type: String,
      enum: ["entry", "intermediate", "expert"],
      default: "entry",
    },
    portfolioLinks: [{ type: String, trim: true }],
    resumeUrl: { type: String, default: null },
    hourlyRate: { type: Number, min: 0, default: 0 },
    availability: {
      type: String,
      enum: ["available", "busy", "unavailable"],
      default: "available",
    },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    completedJobs: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkerProfile", workerProfileSchema);
