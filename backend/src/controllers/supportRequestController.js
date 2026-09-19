const SupportRequest = require("../models/SupportRequest");

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await SupportRequest.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRequest = async (req, res) => {
  try {
    const { topic, details } = req.body;
    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }
    const request = await SupportRequest.create({ topic, details, user: req.user._id });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
