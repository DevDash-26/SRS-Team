const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { ask } = require("../controllers/assistantController");

router.post("/ask", protect, ask);

module.exports = router;
