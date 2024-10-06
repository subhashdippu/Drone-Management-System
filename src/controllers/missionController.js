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
    const existingMission = await Mission.findOne({ name, user: userId });
    if (existingMission) {
      return res.status(400).json({
        message: "Mission with this name already exists for the user",
      });
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

const getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.find({ user: req.user._id });
    res.json(missions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching missions", error });
  }
};

const updateMission = async (req, res) => {
  const { id } = req.params;
  const { name, waypoints, altitude, speed } = req.body;
  const userId = req.user._id;

  try {
    const mission = await Mission.findById(id);

    if (!mission) {
      return res.status(404).json({ message: "Mission not found" });
    }

    if (mission.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this mission" });
    }

    const updatedMission = await Mission.findByIdAndUpdate(
      id,
      { name, waypoints, altitude, speed },
      { new: true }
    );

    res.json(updatedMission);
  } catch (error) {
    res.status(500).json({ message: "Error updating mission", error });
  }
};

const deleteMission = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const mission = await Mission.findById(id);

    if (!mission) {
      return res.status(404).json({ message: "Mission not found" });
    }

    if (mission.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this mission" });
    }

    await Mission.findByIdAndDelete(id);

    res.json({ message: "Mission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting mission", error });
  }
};

const startMissionSimulation = async (req, res) => {
  const { id } = req.params;

  try {
    const mission = await Mission.findById(id);

    if (!mission) {
      return res.status(404).json({ message: "Mission not found" });
    }

    if (mission.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to start this mission" });
    }

    mission.simulation = "active";
    await mission.save();

    res.json({ message: "Mission simulation started", mission });
  } catch (error) {
    res.status(500).json({
      message: "Error starting mission simulation",
      error: error.message,
    });
  }
};

const stopMissionSimulation = async (req, res) => {
  const { id } = req.params;

  try {
    const mission = await Mission.findById(id);

    if (!mission) {
      return res.status(404).json({ message: "Mission not found" });
    }

    if (mission.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to stop this mission" });
    }

    mission.simulation = "closed";
    await mission.save();

    res.json({ message: "Mission simulation stopped", mission });
  } catch (error) {
    res.status(500).json({
      message: "Error stopping mission simulation",
      error: error.message,
    });
  }
};

module.exports = {
  createMission,
  getAllMissions,
  updateMission,
  deleteMission,
  startMissionSimulation,
  stopMissionSimulation,
};
