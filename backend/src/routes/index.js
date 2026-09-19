const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/announcements", require("./announcementRoutes"));
router.use("/events", require("./eventRoutes"));
router.use("/societies", require("./societyRoutes"));
router.use("/lost-found", require("./lostFoundRoutes"));
router.use("/rooms", require("./roomRoutes"));
router.use("/bookings", require("./bookingRoutes"));
router.use("/support-requests", require("./supportRequestRoutes"));
router.use("/feedback", require("./feedbackRoutes"));
router.use("/info", require("./infoContentRoutes"));
router.use("/facility-issues", require("./facilityIssueRoutes"));
router.use("/textbooks", require("./textbookRoutes"));
router.use("/assistant", require("./assistantRoutes"));
router.use("/users", require("./userRoutes"));

module.exports = router;
