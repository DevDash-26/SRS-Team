const Announcement = require("../models/Announcement");
const { AUDIENCE_TYPES } = require("../utils/constants");

// Students only see university-wide announcements plus ones targeted at their own
// faculty, programme or year group. Staff see everything, since they manage all of it.
exports.getAnnouncements = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === "student") {
      filter = {
        $or: [
          { audienceType: "university-wide" },
          { audienceType: { $exists: false } },
          { audienceType: "faculty", audienceValue: req.user.faculty },
          { audienceType: "year-group", audienceValue: req.user.yearGroup },
          { audienceType: "programme", audienceValue: req.user.programme },
        ],
      };
    }
    const announcements = await Announcement.find(filter).sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, audienceType, audienceValue, type } = req.body;
    if (!title || !message) {
      return res.status(400).json({ message: "Title and message are required" });
    }

    const resolvedAudienceType = audienceType || "university-wide";
    if (!AUDIENCE_TYPES.includes(resolvedAudienceType)) {
      return res.status(400).json({ message: "Invalid audience type" });
    }
    if (resolvedAudienceType !== "university-wide" && !audienceValue) {
      return res.status(400).json({ message: "Select a value for the targeted audience" });
    }

    const announcement = await Announcement.create({
      title,
      message,
      audienceType: resolvedAudienceType,
      audienceValue: resolvedAudienceType === "university-wide" ? undefined : audienceValue,
      type,
      postedBy: req.user._id,
    });
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
