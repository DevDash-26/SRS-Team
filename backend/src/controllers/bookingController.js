const Booking = require("../models/Booking");

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("room").sort({ createdAt: -1 });
    const result = bookings.map((b) => ({
      _id: b._id,
      roomName: b.room ? b.room.name : "Room",
      date: b.date,
      timeSlot: b.timeSlot,
      purpose: b.purpose,
      status: b.status,
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { roomId, date, timeSlot, purpose } = req.body;
    if (!roomId || !date || !timeSlot) {
      return res.status(400).json({ message: "Room, date and time slot are required" });
    }
    const booking = await Booking.create({ room: roomId, user: req.user._id, date, timeSlot, purpose });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
