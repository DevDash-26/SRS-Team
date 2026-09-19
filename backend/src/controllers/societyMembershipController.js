const SocietyMembership = require("../models/SocietyMembership");

exports.joinSociety = async (req, res) => {
  try {
    const societyId = req.params.id;
    const existing = await SocietyMembership.findOne({ society: societyId, user: req.user._id });
    if (existing) {
      return res.json({ joined: true });
    }
    await SocietyMembership.create({ society: societyId, user: req.user._id });
    res.json({ joined: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
