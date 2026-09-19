const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { restrictTo } = require("../middleware/roleMiddleware");
const { getRooms, createRoom, updateRoom, deleteRoom } = require("../controllers/roomController");

router.get("/", protect, getRooms);

// Administrative staff / system admin only — manage rooms
router.post("/", protect, restrictTo("administrative", "system-admin"), createRoom);
router.put("/:id", protect, restrictTo("administrative", "system-admin"), updateRoom);
router.delete("/:id", protect, restrictTo("administrative", "system-admin"), deleteRoom);

module.exports = router;
