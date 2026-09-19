const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "academic", "administrative", "society", "system-admin"],
      default: "student",
    },
    // Faculty applies to students and academic staff; programme/year group are student-only
    faculty: { type: String },
    programme: { type: String },
    yearGroup: { type: String },
    resetCode: { type: String },
    resetCodeExpires: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
