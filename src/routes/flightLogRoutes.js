const express = require("express");
const {
  createFlightLog,
  getFlightLogById,
} = require("../controllers/flightLogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createFlightLog);
router.get("/:flightId", getFlightLogById);

module.exports = router;
