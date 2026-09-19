const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
