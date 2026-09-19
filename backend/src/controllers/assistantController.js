const { askAI } = require("../utils/aiClient");
const { buildAssistantContext } = require("../utils/assistantContext");

exports.ask = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "A message is required" });
    }
    // Ground the answer in what is actually published in the hub for this user
    const context = await buildAssistantContext(req.user);
    const answer = await askAI(message, context);
    res.json({ answer });
  } catch (error) {
    next(error);
  }
};
