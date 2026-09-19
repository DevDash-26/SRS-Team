const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getByCategory } = require("../controllers/infoContentController");

router.get("/:category", protect, getByCategory);

module.exports = router;
