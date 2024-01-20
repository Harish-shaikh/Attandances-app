const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now, required: true },
  punchInTime: { type: Date },
  punchOutTime: { type: Date },
  status: {
    type: String,
    enum: ["Present", "Absent", "HalfDay", "Mispunch"],
    default: "Absent",
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
