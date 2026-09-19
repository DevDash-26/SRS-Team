const InfoContent = require("../models/InfoContent");
const { INFO_CATEGORIES } = require("../utils/constants");

exports.getByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    if (!INFO_CATEGORIES.includes(category)) {
      return res.status(404).json({ message: "Unknown info category" });
    }
    const items = await InfoContent.find({ category }).sort({ date: 1, createdAt: -1 }).limit(200);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// Staff only (not students) — used to manage entries like the academic calendar
exports.createInfoContent = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { title, body, date } = req.body;
    if (!INFO_CATEGORIES.includes(category)) {
      return res.status(404).json({ message: "Unknown info category" });
    }
    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required" });
    }
    const item = await InfoContent.create({ category, title, body, date, createdBy: req.user._id });
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

// Keeps published info (FAQ answers, calendar dates, opening hours...) correctable in place
exports.updateInfoContent = async (req, res, next) => {
  try {
    const { title, body, date } = req.body;
    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required" });
    }
    const item = await InfoContent.findByIdAndUpdate(
      req.params.id,
      { title, body, date },
      { new: true, runValidators: true }
    );
    if (!item) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.deleteInfoContent = async (req, res, next) => {
  try {
    const item = await InfoContent.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json({ message: "Entry deleted" });
  } catch (error) {
    next(error);
  }
};
