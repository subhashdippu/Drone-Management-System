const Drone = require("../models/Drone");

const createDrone = async (req, res) => {
  const { name, drone_type, make_name } = req.body;
  const drone = new Drone({
    created_by: req.user._id,
    name,
    drone_type,
    make_name,
  });

  try {
    await drone.save();
    res.status(201).json(drone);
  } catch (error) {
    res.status(500).json({ message: "Error creating drone", error });
  }
};

const getAllDrones = async (req, res) => {
  try {
    const drones = await Drone.find({ created_by: req.user._id });
    res.json(drones);
  } catch (error) {
    res.status(500).json({ message: "Error fetching drones", error });
  }
};

const updateDrone = async (req, res) => {
  const { id } = req.params;
  const { name, drone_type, make_name } = req.body;
  const userId = req.user._id;

  try {
    const drone = await Drone.findById(id);

    if (!drone) {
      return res.status(404).json({ message: "Drone not found" });
    }
    if (drone.created_by.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this drone" });
    }

    drone.name = name;
    drone.drone_type = drone_type;
    drone.make_name = make_name;

    await drone.save();
    res.json(drone);
  } catch (error) {
    res.status(500).json({ message: "Error updating drone", error });
  }
};

const deleteDrone = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const drone = await Drone.findById(id);

    if (!drone) {
      return res.status(404).json({ message: "Drone not found" });
    }

    if (drone.created_by.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this drone" });
    }

    await Drone.findByIdAndDelete(id);

    res.json({ message: "Drone deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting drone", error });
  }
};

module.exports = { createDrone, getAllDrones, updateDrone, deleteDrone };
