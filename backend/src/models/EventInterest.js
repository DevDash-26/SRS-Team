const mongoose = require("mongoose");

const eventInterestSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

eventInterestSchema.index({ event: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("EventInterest", eventInterestSchema);
