const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { restrictTo } = require("../middleware/roleMiddleware");
const { getMyBookings, createBooking, getAllBookings, updateBookingStatus } = require("../controllers/bookingController");

router.get("/", protect, getMyBookings);
router.post("/", protect, createBooking);

// Administrative staff / system admin only — manage every booking
router.get("/all", protect, restrictTo("administrative", "system-admin"), getAllBookings);
router.patch("/:id/status", protect, restrictTo("administrative", "system-admin"), updateBookingStatus);

module.exports = router;
