const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getRooms } = require("../controllers/roomController");

router.get("/", protect, getRooms);

module.exports = router;
