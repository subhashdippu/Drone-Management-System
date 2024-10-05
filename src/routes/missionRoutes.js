const express = require("express");
const {
  createMission,
  getAllMissions,
} = require("../controllers/missionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createMission);
router.get("/", getAllMissions);

module.exports = router;
