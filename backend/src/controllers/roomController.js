const Room = require("../models/Room");

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ name: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Administrative staff / system admin: manage the room inventory
exports.createRoom = async (req, res) => {
  try {
    const { name, capacity, location, available } = req.body;
    if (!name || !capacity) {
      return res.status(400).json({ message: "Name and capacity are required" });
    }
    const room = await Room.create({ name, capacity, location, available });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRoom = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
