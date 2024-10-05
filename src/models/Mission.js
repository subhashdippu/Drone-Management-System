const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    simulation: {
      type: String,
      enum: ["pending", "active", "closed"],
      default: "pending",
    },
    waypoints: [
      {
        alt: { type: Number, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    ],
    altitude: { type: Number, required: true },
    speed: { type: Number, required: true },
    drone_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drone",
      required: true,
    },
    flight_id: { type: String, required: true },
  },
  { timestamps: true }
);

const Mission = mongoose.model("Mission", missionSchema);
module.exports = Mission;
