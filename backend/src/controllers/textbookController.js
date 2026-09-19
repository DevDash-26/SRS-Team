const TextbookListing = require("../models/TextbookListing");

// The lister's name and email come back so an interested student can actually
// reach them and complete the exchange.
exports.getTextbooks = async (req, res, next) => {
  try {
    const listings = await TextbookListing.find()
      .populate("listedBy", "name email")
      .sort({ createdAt: -1 })
      .limit(200);
    res.json(listings);
  } catch (error) {
    next(error);
  }
};

exports.listTextbook = async (req, res, next) => {
  try {
    const { title, subject, price } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const listing = await TextbookListing.create({ title, subject, price, listedBy: req.user._id });
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
