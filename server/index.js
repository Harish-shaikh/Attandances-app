// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/attendance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const User = require("./models/User");
const Attendance = require("./models/Attendance");
const userRoutes = require("./routes/userRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);

const markAbsentAutomated = async () => {
  try {
    const users = await User.find();

    for (const user of users) {
      const existingAttendance = await Attendance.findOne({
        user: user._id,
        date: {
          $gte: new Date().setHours(0, 0, 0, 0),
          $lt: new Date().setHours(23, 59, 59, 999),
        },
      });

      if (!existingAttendance) {
        await axios.post(`http://localhost:${PORT}/api/attendance/absent`, {
          userId: user._id,
        });
      }
    }
  } catch (error) {
    console.error("Automated process error:", error);
  } finally {
    // Call the function again after 24 hours
    setTimeout(markAbsentAutomated, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
  }
};

// markAbsentAutomated();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
