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

module.exports = { createDrone };
