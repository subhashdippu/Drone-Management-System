const Mission = require("../models/Mission");
const Drone = require("../models/Drone");

const createMission = async (req, res) => {
  const { name, waypoints, altitude, speed, drone_id, flight_id } = req.body;

  try {
    const userId = req.user._id;
    const drone = await Drone.findOne({ _id: drone_id, created_by: userId });

    if (!drone) {
      return res
        .status(404)
        .json({ message: "Drone not found or does not belong to the user" });
    }

    const mission = new Mission({
      user: userId,
      name,
      waypoints,
      altitude,
      speed,
      drone_id,
      flight_id,
    });

    await mission.save();
    res.status(201).json(mission);
  } catch (error) {
    res.status(500).json({ message: "Error creating mission", error });
  }
};

module.exports = {
  createMission,
};
