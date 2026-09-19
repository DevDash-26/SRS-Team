const mongoose = require("mongoose");

const textbookListingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String },
    price: { type: String },
    listedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TextbookListing", textbookListingSchema);
