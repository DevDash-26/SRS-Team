const Event = require("../models/Event");
const EventInterest = require("../models/EventInterest");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    const myInterests = await EventInterest.find({ user: req.user._id });
    const interestedIds = myInterests.map((i) => i.event.toString());

    const withCounts = await Promise.all(
      events.map(async (event) => {
        const count = await EventInterest.countDocuments({ event: event._id });
        return {
          ...event.toObject(),
          interested: interestedIds.includes(event._id.toString()),
          interestCount: count,
        };
      })
    );

    res.json(withCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, date, location, organizer, category } = req.body;
    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required" });
    }
    const event = await Event.create({
      title,
      date,
      location,
      organizer,
      category,
      createdBy: req.user._id,
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    await EventInterest.deleteMany({ event: req.params.id });
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
