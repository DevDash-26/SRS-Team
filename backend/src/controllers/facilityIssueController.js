const FacilityIssue = require("../models/FacilityIssue");

exports.getIssues = async (req, res) => {
  try {
    const issues = await FacilityIssue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.reportIssue = async (req, res) => {
  try {
    const { title, location, description } = req.body;
    if (!title || !location) {
      return res.status(400).json({ message: "Title and location are required" });
    }
    const issue = await FacilityIssue.create({ title, location, description, reportedBy: req.user._id });
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
