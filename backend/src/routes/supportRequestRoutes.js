const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { restrictTo } = require("../middleware/roleMiddleware");
const {
  getMyRequests,
  createRequest,
  getAllRequests,
  updateRequest,
} = require("../controllers/supportRequestController");

router.get("/", protect, getMyRequests);
router.post("/", protect, createRequest);

// Academic and administrative staff triage and respond to requests
router.get("/all", protect, restrictTo("academic", "administrative", "system-admin"), getAllRequests);
router.patch("/:id", protect, restrictTo("academic", "administrative", "system-admin"), updateRequest);

module.exports = router;
