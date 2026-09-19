const mongoose = require("mongoose");

const infoContentSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InfoContent", infoContentSchema);
