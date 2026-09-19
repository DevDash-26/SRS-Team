const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getIssues, reportIssue } = require("../controllers/facilityIssueController");

router.get("/", protect, getIssues);
router.post("/", protect, reportIssue);

module.exports = router;
