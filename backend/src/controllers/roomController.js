const Room = require("../models/Room");

exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().sort({ name: 1 }).limit(200);
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

// Administrative staff / system admin: manage the room inventory
exports.createRoom = async (req, res, next) => {
  try {
    const { name, capacity, location, available } = req.body;
    if (!name || !capacity) {
      return res.status(400).json({ message: "Name and capacity are required" });
    }
    const room = await Room.create({ name, capacity, location, available });
    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    const { name, capacity, location, available } = req.body;
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { name, capacity, location, available },
      { new: true, runValidators: true }
    );
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    next(error);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted" });
  } catch (error) {
    next(error);
  }
};
