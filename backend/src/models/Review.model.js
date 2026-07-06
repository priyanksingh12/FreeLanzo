const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true, index: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reviewee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    reviewerRole: { type: String, enum: ["worker", "hirer"], required: true },
    ratings: {
      communication: { type: Number, min: 1, max: 5 },
      // Filled when a hirer reviews a worker:
      quality: { type: Number, min: 1, max: 5 },
      timeliness: { type: Number, min: 1, max: 5 },
      // Filled when a worker reviews a hirer:
      paymentReliability: { type: Number, min: 1, max: 5 },
      professionalism: { type: Number, min: 1, max: 5 },
    },
    overallRating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, maxlength: 1000, default: "" },
  },
  { timestamps: true }
);

// One review per person per job
reviewSchema.index({ job: 1, reviewer: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
