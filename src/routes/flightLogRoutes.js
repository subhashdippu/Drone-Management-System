const express = require("express");
const { createFlightLog } = require("../controllers/flightLogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createFlightLog);

module.exports = router;
