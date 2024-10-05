const express = require("express");
const { createDrone } = require("../controllers/droneController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createDrone);

module.exports = router;
