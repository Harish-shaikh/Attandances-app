// routes/attendanceRoutes.js
const express = require("express");
const Attendance = require("../models/Attendance");
const User = require("../models/User");
const axios = require("axios");

const router = express.Router();

router.post("/punchin", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingAttendance = await Attendance.findOne({
      user: userId,
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: "Punch-in already recorded for today" });
    }
    console.log(new Date());

    const newAttendance = new Attendance({
      user: userId,
      punchInTime: new Date(),
      status: "HalfDay",
    });
    await newAttendance.save();

    return res.json({
      message: "Punch-in successful",
      attendance: newAttendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/punchout", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const attendance = await Attendance.findOne({
      user: userId,
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
    });

    if (!attendance) {
      return res
        .status(400)
        .json({ message: "Punch-in not recorded for today" });
    }

    if (attendance.punchOutTime) {
      return res
        .status(400)
        .json({ message: "Punch-out already recorded for today" });
    }

    attendance.punchOutTime = new Date();
    const timeDifference = attendance.punchOutTime - attendance.punchInTime;
    const officeHours = 9 * 60 * 60 * 1000;

    if (timeDifference >= officeHours) {
      attendance.status = "Present";
    } else if (timeDifference < officeHours) {
      attendance.status = "HalfDay";
    }

    await attendance.save();

    return res.json({
      message: "Punch-out successful",
      attendance,
      timeDifference,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const attendanceRecords = await Attendance.find({ user: userId });
    return res.json({ user, attendanceRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allAttendanceRecords = await Attendance.find().populate(
      "user",
      "username email phone"
    );
    return res.json({ allAttendanceRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/absent", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingAttendance = await Attendance.findOne({
      user: userId,
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lt: new Date().setHours(23, 59, 59, 999),
      },
    });

    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: "Attendance record already exists for today" });
    }

    const newAttendance = new Attendance({ user: userId, status: "Absent" });
    await newAttendance.save();

    return res.json({
      message: "Marked as absent for today",
      attendance: newAttendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
