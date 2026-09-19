const EventInterest = require("../models/EventInterest");

exports.toggleInterest = async (req, res) => {
  try {
    const eventId = req.params.id;
    const existing = await EventInterest.findOne({ event: eventId, user: req.user._id });

    if (existing) {
      await existing.deleteOne();
      return res.json({ interested: false });
    }

    await EventInterest.create({ event: eventId, user: req.user._id });
    res.json({ interested: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
