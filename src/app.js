const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const droneRoutes = require("./routes/droneRoutes");
const missionRoutes = require("./routes/missionRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/drones", droneRoutes);
app.use("/missions", missionRoutes);

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
