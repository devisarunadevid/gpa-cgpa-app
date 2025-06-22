const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Student = require("./models/Student");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

async function createStudents() {
  const students = [{ RegisterNo: "12347", RollNo: "6791" }];

  try {
    await Student.insertMany(students);
    console.log("Students created");
  } catch (err) {
    console.error("Error creating students:", err);
  }
}

createStudents().catch((err) => console.log(err));
