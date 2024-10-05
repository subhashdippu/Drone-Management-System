const mongoose = require("mongoose");

const droneSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    drone_type: { type: String, required: true },
    make_name: { type: String, required: true },
  },
  { timestamps: true }
);

const Drone = mongoose.model("Drone", droneSchema);
module.exports = Drone;
