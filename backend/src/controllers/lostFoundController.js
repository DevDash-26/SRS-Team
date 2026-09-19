const LostFoundItem = require("../models/LostFoundItem");

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Supports searching by keyword across name/location/description and filtering
// by lost vs found, so students can look for a specific item instead of scrolling.
exports.getItems = async (req, res, next) => {
  try {
    const { q, status } = req.query;
    const filter = {};

    if (status === "lost" || status === "found") {
      filter.status = status;
    }

    if (q && q.trim()) {
      const term = new RegExp(escapeRegex(q.trim()), "i");
      filter.$or = [{ name: term }, { location: term }, { description: term }];
    }

    const items = await LostFoundItem.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.reportItem = async (req, res, next) => {
  try {
    const { name, status, location, description } = req.body;
    if (!name || !location) {
      return res.status(400).json({ message: "Name and location are required" });
    }
    const photoUrl = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : undefined;
    const item = await LostFoundItem.create({ name, status, location, description, photoUrl, reportedBy: req.user._id });
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};
