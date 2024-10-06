const express = require("express");
const {
  createFlightLog,
  getFlightLogById,
  updateFlightLog,
  deleteFlightLog,
  generatePDF,
} = require("../controllers/flightLogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createFlightLog);
router.get("/:flightId", getFlightLogById);
router.put("/:id", updateFlightLog);
router.delete("/:id", deleteFlightLog);
router.get("/:flightId/pdf", generatePDF);
module.exports = router;
