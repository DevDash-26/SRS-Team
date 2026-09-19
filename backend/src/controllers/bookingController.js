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

// Administrative staff / system admin: see every booking to approve or reject it
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("room").populate("user", "name email role").sort({ createdAt: -1 });
    const result = bookings.map((b) => ({
      _id: b._id,
      roomName: b.room ? b.room.name : "Room",
      userName: b.user ? b.user.name : "Unknown",
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

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be approved or rejected" });
    }
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
