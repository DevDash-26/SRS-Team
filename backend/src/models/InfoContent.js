const mongoose = require("mongoose");

const infoContentSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InfoContent", infoContentSchema);
