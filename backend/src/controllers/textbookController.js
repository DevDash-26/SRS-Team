const TextbookListing = require("../models/TextbookListing");

exports.getTextbooks = async (req, res) => {
  try {
    const listings = await TextbookListing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listTextbook = async (req, res) => {
  try {
    const { title, subject, price } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const listing = await TextbookListing.create({ title, subject, price, listedBy: req.user._id });
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
