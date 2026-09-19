const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { restrictTo } = require("../middleware/roleMiddleware");
const { STAFF_ROLES } = require("../utils/constants");
const {
  getByCategory,
  createInfoContent,
  updateInfoContent,
  deleteInfoContent,
} = require("../controllers/infoContentController");

router.get("/:category", protect, getByCategory);

// Everyone except students can manage info content (e.g. the academic calendar)
router.post("/:category", protect, restrictTo(...STAFF_ROLES), createInfoContent);
router.put("/:id", protect, restrictTo(...STAFF_ROLES), updateInfoContent);
router.delete("/:id", protect, restrictTo(...STAFF_ROLES), deleteInfoContent);

module.exports = router;
