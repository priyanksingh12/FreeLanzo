const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    hirer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, maxlength: 5000 },
    requiredSkills: [{ type: String, trim: true }],
    budget: { type: Number, required: true, min: 0 },
    deadline: { type: Date, required: true },
    location: {
      country: { type: String, default: null },
      state: { type: String, default: null },
      city: { type: String, default: null },
    },
    experienceLevelRequired: {
      type: String,
      enum: ["entry", "intermediate", "expert"],
      default: "entry",
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "completed", "closed"],
      default: "open",
    },
    hiredWorker: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

jobSchema.index({ requiredSkills: 1, "location.city": 1, status: 1 });

module.exports = mongoose.model("Job", jobSchema);
