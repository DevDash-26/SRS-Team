const mongoose = require("mongoose");

const supportRequestSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    details: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupportRequest", supportRequestSchema);
