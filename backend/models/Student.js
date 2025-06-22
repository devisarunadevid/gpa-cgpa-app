const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  RegisterNo: { type: String, required: true, unique: true },
  RollNo: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
