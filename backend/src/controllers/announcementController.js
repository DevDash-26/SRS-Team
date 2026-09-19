const Announcement = require("../models/Announcement");
const { AUDIENCE_TYPES } = require("../utils/constants");
const { buildAnnouncementFilter } = require("../utils/audienceFilter");

// Students only see university-wide announcements plus ones targeted at their own
// faculty, programme or year group. Staff see everything, since they manage all of it.
exports.getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find(buildAnnouncementFilter(req.user))
      .sort({ createdAt: -1 })
      .limit(200);
    res.json(announcements);
  } catch (error) {
    next(error);
  }
};

exports.createAnnouncement = async (req, res, next) => {
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
    next(error);
  }
};

// Lets staff correct a published announcement instead of deleting and reposting it
exports.updateAnnouncement = async (req, res, next) => {
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

    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      {
        title,
        message,
        audienceType: resolvedAudienceType,
        audienceValue: resolvedAudienceType === "university-wide" ? undefined : audienceValue,
        type,
      },
      { new: true, runValidators: true }
    );
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.json(announcement);
  } catch (error) {
    next(error);
  }
};

exports.deleteAnnouncement = async (req, res, next) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (error) {
    next(error);
  }
};
