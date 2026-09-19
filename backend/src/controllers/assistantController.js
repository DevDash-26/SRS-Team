const { askAI } = require("../utils/aiClient");

exports.ask = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "A message is required" });
    }
    const answer = await askAI(message);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
