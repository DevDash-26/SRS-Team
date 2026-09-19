const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getMyBookings, createBooking } = require("../controllers/bookingController");

router.get("/", protect, getMyBookings);
router.post("/", protect, createBooking);

module.exports = router;
