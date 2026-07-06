const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true, index: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    proposalText: { type: String, required: true, maxlength: 3000 },
    expectedBudget: { type: Number, required: true, min: 0 },
    estimatedCompletionDays: { type: Number, required: true, min: 1 },
    portfolioSamples: [{ type: String }],
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "withdrawn"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// One application per worker per job
applicationSchema.index({ job: 1, worker: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
