const SupportRequest = require("../models/SupportRequest");
const { SUPPORT_TYPES, SUPPORT_STATUSES } = require("../utils/constants");

exports.getMyRequests = async (req, res, next) => {
  try {
    const requests = await SupportRequest.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(200);
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

exports.createRequest = async (req, res, next) => {
  try {
    const { topic, type, details } = req.body;
    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }
    if (type && !SUPPORT_TYPES.includes(type)) {
      return res.status(400).json({ message: "Invalid support type" });
    }
    const request = await SupportRequest.create({
      topic,
      type: type || "other",
      details,
      user: req.user._id,
    });
    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

// Academic/administrative staff review every request so study group, peer tutoring
// and mentorship asks can actually be picked up and answered.
exports.getAllRequests = async (req, res, next) => {
  try {
    const requests = await SupportRequest.find()
      .populate("user", "name email role faculty programme yearGroup")
      .sort({ createdAt: -1 })
      .limit(200);
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

exports.updateRequest = async (req, res, next) => {
  try {
    const { status, response } = req.body;
    if (status && !SUPPORT_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const request = await SupportRequest.findByIdAndUpdate(
      req.params.id,
      { status: status || "in-progress", response, handledBy: req.user._id },
      { new: true, runValidators: true }
    ).populate("user", "name email role");
    if (!request) {
      return res.status(404).json({ message: "Support request not found" });
    }
    res.json(request);
  } catch (error) {
    next(error);
  }
};
