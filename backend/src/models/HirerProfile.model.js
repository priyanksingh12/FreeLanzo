const mongoose = require("mongoose");

const hirerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    companyName: { type: String, trim: true, default: "" },
    about: { type: String, maxlength: 1000, default: "" },
    jobsPosted: { type: Number, default: 0 },
    activeProjects: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HirerProfile", hirerProfileSchema);
