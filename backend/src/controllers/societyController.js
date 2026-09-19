const Society = require("../models/Society");
const SocietyMembership = require("../models/SocietyMembership");

exports.getSocieties = async (req, res) => {
  try {
    const societies = await Society.find().sort({ name: 1 });
    const myMemberships = await SocietyMembership.find({ user: req.user._id });
    const joinedIds = myMemberships.map((m) => m.society.toString());

    const result = societies.map((s) => ({
      ...s.toObject(),
      joined: joinedIds.includes(s._id.toString()),
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSociety = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const society = await Society.create({ name, description, createdBy: req.user._id });
    res.status(201).json(society);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSociety = async (req, res) => {
  try {
    await Society.findByIdAndDelete(req.params.id);
    await SocietyMembership.deleteMany({ society: req.params.id });
    res.json({ message: "Society deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
