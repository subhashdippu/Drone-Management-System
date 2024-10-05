const mongoose = require("mongoose");

const flightLogSchema = new mongoose.Schema(
  {
    mission_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
      required: true,
    },
    drone_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drone",
      required: true,
    },
    status: {
      type: String,
      enum: ["in_progress", "completed", "failed"],
      required: true,
    },
    flight_id: {
      type: String,
      required: true,
      unique: true,
    },
    data: {
      altitudes: [Number],
      speeds: [Number],
      timestamps: [Date],
    },
  },
  { timestamps: true }
);

const FlightLog = mongoose.model("FlightLog", flightLogSchema);
module.exports = FlightLog;
