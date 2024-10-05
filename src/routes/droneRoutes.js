const express = require("express");
const {
  createDrone,
  getAllDrones,
  updateDrone,
} = require("../controllers/droneController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createDrone);
router.get("/", getAllDrones);
router.put("/:id", updateDrone);

module.exports = router;
