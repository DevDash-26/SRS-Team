const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getMyRequests, createRequest } = require("../controllers/supportRequestController");

router.get("/", protect, getMyRequests);
router.post("/", protect, createRequest);

module.exports = router;
