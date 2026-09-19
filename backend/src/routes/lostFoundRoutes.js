const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { uploadPhoto } = require("../middleware/upload");
const { getItems, reportItem } = require("../controllers/lostFoundController");

router.get("/", protect, getItems);
router.post("/", protect, uploadPhoto, reportItem);

module.exports = router;
