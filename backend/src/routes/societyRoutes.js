const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { restrictTo } = require("../middleware/roleMiddleware");
const { getSocieties, createSociety, updateSociety, deleteSociety } = require("../controllers/societyController");
const { joinSociety } = require("../controllers/societyMembershipController");

router.get("/", protect, getSocieties);
router.post("/", protect, restrictTo("society", "system-admin"), createSociety);
router.put("/:id", protect, restrictTo("society", "system-admin"), updateSociety);
router.delete("/:id", protect, restrictTo("society", "system-admin"), deleteSociety);
router.post("/:id/join", protect, joinSociety);

module.exports = router;
