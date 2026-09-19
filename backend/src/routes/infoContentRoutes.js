const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { restrictTo } = require("../middleware/roleMiddleware");
const { STAFF_ROLES } = require("../utils/constants");
const { getByCategory, createInfoContent, deleteInfoContent } = require("../controllers/infoContentController");

router.get("/:category", protect, getByCategory);

// Everyone except students can manage info content (e.g. the academic calendar)
router.post("/:category", protect, restrictTo(...STAFF_ROLES), createInfoContent);
router.delete("/:id", protect, restrictTo(...STAFF_ROLES), deleteInfoContent);

module.exports = router;
