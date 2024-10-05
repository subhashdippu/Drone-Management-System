const express = require("express");
const {
  createMission,
  getAllMissions,
  updateMission,
} = require("../controllers/missionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createMission);
router.get("/", getAllMissions);
router.put("/:id", updateMission);

module.exports = router;
