const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { restrictTo } = require("../middleware/roleMiddleware");
const { STAFF_ROLES } = require("../utils/constants");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/eventController");
const { toggleInterest } = require("../controllers/eventInterestController");

router.get("/", protect, getEvents);
router.post("/", protect, restrictTo(...STAFF_ROLES), createEvent);
router.put("/:id", protect, restrictTo(...STAFF_ROLES), updateEvent);
router.delete("/:id", protect, restrictTo(...STAFF_ROLES), deleteEvent);
router.post("/:id/interest", protect, toggleInterest);

module.exports = router;
