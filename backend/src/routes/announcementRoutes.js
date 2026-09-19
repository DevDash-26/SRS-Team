const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { restrictTo } = require("../middleware/roleMiddleware");
const { STAFF_ROLES } = require("../utils/constants");
const {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

router.get("/", protect, getAnnouncements);
router.post("/", protect, restrictTo(...STAFF_ROLES), createAnnouncement);
router.put("/:id", protect, restrictTo(...STAFF_ROLES), updateAnnouncement);
router.delete("/:id", protect, restrictTo(...STAFF_ROLES), deleteAnnouncement);

module.exports = router;
