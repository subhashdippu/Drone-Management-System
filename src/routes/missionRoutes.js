const express = require("express");
const {
  createMission,
  getAllMissions,
  updateMission,
  deleteMission,
  startMissionSimulation,
  stopMissionSimulation,
} = require("../controllers/missionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createMission);
router.get("/", getAllMissions);
router.put("/:id", updateMission);
router.delete("/:id", deleteMission);
router.post("/:id/start", startMissionSimulation);
router.post("/:id/stop", stopMissionSimulation);

module.exports = router;
