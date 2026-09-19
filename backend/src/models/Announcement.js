const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    // "university-wide" reaches everyone; the others are matched against a student's
    // own faculty/programme/yearGroup so targeted announcements only reach the right students
    audienceType: {
      type: String,
      enum: ["university-wide", "faculty", "year-group", "programme"],
      default: "university-wide",
    },
    audienceValue: { type: String },
    type: {
      type: String,
      enum: ["general", "emergency", "schedule-change"],
      default: "general",
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
