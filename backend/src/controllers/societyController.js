const Society = require("../models/Society");
const SocietyMembership = require("../models/SocietyMembership");

exports.getSocieties = async (req, res, next) => {
  try {
    const societies = await Society.find().sort({ name: 1 }).limit(200);
    const myMemberships = await SocietyMembership.find({ user: req.user._id });
    const joinedIds = myMemberships.map((m) => m.society.toString());

    const result = societies.map((s) => ({
      ...s.toObject(),
      joined: joinedIds.includes(s._id.toString()),
    }));

    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.createSociety = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const society = await Society.create({ name, description, createdBy: req.user._id });
    res.status(201).json(society);
  } catch (error) {
    next(error);
  }
};

// Society reps keep their own listing accurate without going through an admin
exports.updateSociety = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const society = await Society.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!society) {
      return res.status(404).json({ message: "Society not found" });
    }
    res.json(society);
  } catch (error) {
    next(error);
  }
};

exports.deleteSociety = async (req, res, next) => {
  try {
    await Society.findByIdAndDelete(req.params.id);
    await SocietyMembership.deleteMany({ society: req.params.id });
    res.json({ message: "Society deleted" });
  } catch (error) {
    next(error);
  }
};
