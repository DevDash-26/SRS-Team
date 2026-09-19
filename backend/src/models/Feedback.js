const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Closes the feedback loop: staff can reply and mark items as handled
    status: { type: String, enum: ["new", "reviewed"], default: "new" },
    response: { type: String },
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
