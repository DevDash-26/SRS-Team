const Event = require("../models/Event");
const EventInterest = require("../models/EventInterest");

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 }).limit(200);
    const eventIds = events.map((e) => e._id);

    // Two queries regardless of how many events there are, rather than one
    // count query per event
    const [myInterests, counts] = await Promise.all([
      EventInterest.find({ user: req.user._id, event: { $in: eventIds } }),
      EventInterest.aggregate([
        { $match: { event: { $in: eventIds } } },
        { $group: { _id: "$event", count: { $sum: 1 } } },
      ]),
    ]);

    const interestedIds = new Set(myInterests.map((i) => i.event.toString()));
    const countByEvent = new Map(counts.map((c) => [String(c._id), c.count]));

    const withCounts = events.map((event) => ({
      ...event.toObject(),
      interested: interestedIds.has(event._id.toString()),
      interestCount: countByEvent.get(event._id.toString()) || 0,
    }));

    res.json(withCounts);
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const { title, date, location, organizer, category, guestName } = req.body;
    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required" });
    }
    if (category === "guest-lecture" && !guestName) {
      return res.status(400).json({ message: "Guest lecturer's name is required" });
    }
    const event = await Event.create({
      title,
      date,
      location,
      organizer,
      category,
      guestName: category === "guest-lecture" ? guestName : undefined,
      createdBy: req.user._id,
    });
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

// Keeps a published event accurate when details such as the date or room change
exports.updateEvent = async (req, res, next) => {
  try {
    const { title, date, location, organizer, category, guestName } = req.body;
    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required" });
    }
    if (category === "guest-lecture" && !guestName) {
      return res.status(400).json({ message: "Guest lecturer's name is required" });
    }
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        date,
        location,
        organizer,
        category,
        guestName: category === "guest-lecture" ? guestName : undefined,
      },
      { new: true, runValidators: true }
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    await EventInterest.deleteMany({ event: req.params.id });
    res.json({ message: "Event deleted" });
  } catch (error) {
    next(error);
  }
};
