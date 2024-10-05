const express = require("express");
const { createMission } = require("../controllers/missionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createMission);

module.exports = router;
