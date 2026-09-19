const Feedback = require("../models/Feedback");
const { FEEDBACK_STATUSES } = require("../utils/constants");

exports.submitFeedback = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }
    const feedback = await Feedback.create({ message, user: req.user._id });
    res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};

// Students see the feedback they sent (and any reply); staff see everything,
// so questions raised can actually be answered rather than disappearing.
exports.getFeedback = async (req, res, next) => {
  try {
    const filter = req.user.role === "student" ? { user: req.user._id } : {};
    const items = await Feedback.find(filter)
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .limit(200);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.respondToFeedback = async (req, res, next) => {
  try {
    const { response, status } = req.body;
    if (status && !FEEDBACK_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { response, status: status || "reviewed", respondedBy: req.user._id },
      { new: true, runValidators: true }
    ).populate("user", "name email role");
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json(feedback);
  } catch (error) {
    next(error);
  }
};
