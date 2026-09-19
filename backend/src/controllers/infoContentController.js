const InfoContent = require("../models/InfoContent");
const { INFO_CATEGORIES } = require("../utils/constants");

exports.getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!INFO_CATEGORIES.includes(category)) {
      return res.status(404).json({ message: "Unknown info category" });
    }
    const items = await InfoContent.find({ category }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
