const mongoose = require("mongoose");

const savedWorkerSchema = new mongoose.Schema(
  {
    hirer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

savedWorkerSchema.index({ hirer: 1, worker: 1 }, { unique: true });

module.exports = mongoose.model("SavedWorker", savedWorkerSchema);
