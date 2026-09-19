const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getItems, reportItem } = require("../controllers/lostFoundController");

router.get("/", protect, getItems);
router.post("/", protect, reportItem);

module.exports = router;
