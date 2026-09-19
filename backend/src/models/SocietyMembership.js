const mongoose = require("mongoose");

const societyMembershipSchema = new mongoose.Schema(
  {
    society: { type: mongoose.Schema.Types.ObjectId, ref: "Society", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

societyMembershipSchema.index({ society: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("SocietyMembership", societyMembershipSchema);
