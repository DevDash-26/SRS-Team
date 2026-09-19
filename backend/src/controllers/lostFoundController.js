const LostFoundItem = require("../models/LostFoundItem");

exports.getItems = async (req, res) => {
  try {
    const items = await LostFoundItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.reportItem = async (req, res) => {
  try {
    const { name, status, location, description } = req.body;
    if (!name || !location) {
      return res.status(400).json({ message: "Name and location are required" });
    }
    const item = await LostFoundItem.create({ name, status, location, description, reportedBy: req.user._id });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
