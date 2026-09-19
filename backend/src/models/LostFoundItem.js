const mongoose = require("mongoose");

const lostFoundItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, enum: ["lost", "found"], default: "lost" },
    location: { type: String, required: true },
    description: { type: String },
    photoUrl: { type: String },
    date: { type: Date, default: Date.now },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LostFoundItem", lostFoundItemSchema);
