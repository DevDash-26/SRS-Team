const mongoose = require("mongoose");

const supportRequestSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    // The kind of support asked for, so staff can route study groups,
    // peer tutoring and mentorship requests differently
    type: {
      type: String,
      enum: ["study-group", "peer-tutoring", "mentorship", "other"],
      default: "other",
    },
    details: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["open", "in-progress", "resolved"], default: "open" },
    response: { type: String },
    handledBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupportRequest", supportRequestSchema);
