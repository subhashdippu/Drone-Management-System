const FlightLog = require("../models/flightLog");
const Mission = require("../models/Mission");
const Drone = require("../models/Drone");
const PDFDocument = require("pdfkit");
const createFlightLog = async (req, res) => {
  const { flight_id, status, data } = req.body;
  const userId = req.user._id;

  try {
    const existingFlightLog = await FlightLog.findOne({ flight_id });

    if (existingFlightLog) {
      return res.status(409).json({
        message: "Flight log with this flight_id already exists",
      });
    }

    const mission = await Mission.findOne({ user: userId, flight_id });
    if (!mission) {
      return res.status(404).json({
        message: "No mission found for this user with the given flight_id",
      });
    }

    const drone = await Drone.findOne({ created_by: userId });
    if (!drone) {
      return res.status(404).json({ message: "No drone found for this user" });
    }

    const flightLog = new FlightLog({
      mission_id: mission._id,
      drone_id: drone._id,
      status,
      flight_id,
      data,
    });

    await flightLog.save();
    res.status(201).json(flightLog);
  } catch (error) {
    res.status(500).json({ message: "Error creating flight log", error });
  }
};

const getFlightLogById = async (req, res) => {
  const { flightId } = req.params;

  try {
    const flightLog = await FlightLog.findOne({ flight_id: flightId })
      .populate("mission_id")
      .populate("drone_id");

    if (!flightLog) {
      return res.status(404).json({ message: "Flight log not found" });
    }

    res.json(flightLog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flight log", error });
  }
};

const updateFlightLog = async (req, res) => {
  const { id } = req.params;
  const { status, data } = req.body;

  try {
    const flightLog = await FlightLog.findById(id)
      .populate("mission_id")
      .populate("drone_id");

    if (!flightLog) {
      return res.status(404).json({ message: "Flight log not found" });
    }

    if (!flightLog.mission_id.user.equals(req.user._id)) {
      return res.status(403).json({
        message: "You do not have permission to update this flight log",
      });
    }

    flightLog.status = status !== undefined ? status : flightLog.status;
    flightLog.data = data !== undefined ? data : flightLog.data;

    await flightLog.save();
    res.json(flightLog);
  } catch (error) {
    res.status(500).json({ message: "Error updating flight log", error });
  }
};

module.exports = {
  createFlightLog,
  getFlightLogById,
  updateFlightLog,
};
