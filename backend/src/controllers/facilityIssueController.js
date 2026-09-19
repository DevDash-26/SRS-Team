const FacilityIssue = require("../models/FacilityIssue");

// Students only see issues they reported themselves; every other role sees all of them
exports.getIssues = async (req, res) => {
  try {
    const filter = req.user.role === "student" ? { reportedBy: req.user._id } : {};
    const issues = await FacilityIssue.find(filter).sort({ createdAt: -1 });
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
