const express = require("express");
const {
  createMission,
  getAllMissions,
  updateMission,
  deleteMission,
} = require("../controllers/missionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createMission);
router.get("/", getAllMissions);
router.put("/:id", updateMission);
router.delete("/:id", deleteMission);

module.exports = router;
