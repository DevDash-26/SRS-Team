const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getTextbooks, listTextbook } = require("../controllers/textbookController");

router.get("/", protect, getTextbooks);
router.post("/", protect, listTextbook);

module.exports = router;
