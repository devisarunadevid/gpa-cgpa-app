const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Student = require("./models/Student");

const app = express();
app.use(express.json());
const corsOptions = {
  origin: ["https://gpa-cgpa-app.vercel.app"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend is live!");
});

app.post("/login", async (req, res) => {
  const { RegisterNo, RollNo } = req.body;
  console.log("Login attempt with:", RegisterNo, RollNo);
  try {
    const student = await Student.findOne({ RegisterNo: RegisterNo.trim() });
    console.log("Student found:", student);
    if (!student) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (student.RollNo !== RollNo) {
      return res.status(401).json({ message: "Invalid Roll Number!" });
    }
    const token = jwt.sign(
      { RegisterNo: student.RegisterNo, RollNo: student.RollNo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login Successful!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occured.Please try again" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
