const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { restrictTo } = require("../middleware/roleMiddleware");
const { STAFF_ROLES } = require("../utils/constants");
const { submitFeedback, getFeedback, respondToFeedback } = require("../controllers/feedbackController");

router.post("/", protect, submitFeedback);

// Students get their own feedback plus replies; staff get everything and can respond
router.get("/", protect, getFeedback);
router.patch("/:id", protect, restrictTo(...STAFF_ROLES), respondToFeedback);

module.exports = router;
