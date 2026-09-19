const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { restrictTo } = require("../middleware/roleMiddleware");
const { getMe, getUsers, createUser } = require("../controllers/userController");

router.get("/me", protect, getMe);

// System Administrator only — enforced here on the backend,
// not just hidden in the UI
router.get("/", protect, restrictTo("system-admin"), getUsers);
router.post("/", protect, restrictTo("system-admin"), createUser);

module.exports = router;