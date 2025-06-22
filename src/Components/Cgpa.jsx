import vcetLogo from "../assets/VCET Logo.jpg";
import cseLogo from "../assets/CSE LOGO.jpg";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import jsPDF from "jspdf";

function Cgpa() {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [grades, setGrades] = useState({});
  const [isSemesterSelected, setIsSemesterSelected] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gpaResults, setGpaResults] = useState({});
  const [cgpaResult, setCgpaResult] = useState("0.00");
  const { width, height } = useWindowSize();
  const registerNumber = localStorage.getItem("RegisterNo") || "N/A";

  useEffect(() => {
    let timer;
    if (showConfetti) {
      timer = setTimeout(() => setShowConfetti(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showConfetti]);

  useEffect(() => {
    if (selectedSemester) calculateGPA();
    calculateCGPA();
  }, [selectedSemester, grades]);

  const subjects = {
    "I Semester": [
      { name: "Engineering Chemistry", credits: 3, code: "21CH101" },
      {
        name: "Problem Solving and Python Programming",
        credits: 3,
        code: "21CS101",
      },
      {
        name: "Problem Solving and Python Programming Laboratory",
        credits: 2,
        code: "21CS102",
      },
      { name: "Physics and Chemistry Laboratory", credits: 2, code: "21PC101" },
      { name: "Professional English-I", credits: 4, code: "21EN101" },
      { name: "Matrices and Calculus", credits: 4, code: "21MA101" },
      { name: "Engineering Physics", credits: 3, code: "21PH101" },
      { name: "Heritage of Tamils", credits: 1, code: "21TA101" },
    ],
    "II Semester": [
      { name: "Programming in C", credits: 3, code: "21CS103" },
      { name: "Programming in C Laboratory", credits: 2, code: "21CS104" },
      {
        name: "Basic Electrical and Electronics Engineering for Information Science",
        credits: 3,
        code: "21EE104",
      },
      { name: "English-II", credits: 3, code: "21EN102" },
      {
        name: "Sampling Techniques and Numerical Methods",
        credits: 4,
        code: "21MA103",
      },
      { name: "Engineering Graphics", credits: 3, code: "21ME101" },
      { name: "Physics for Information Science", credits: 3, code: "21PH103" },
      { name: "Tamils and Technology", credits: 1, code: "21TA102" },
      { name: "Engineering Practices Laboratory", credits: 2, code: "21EM101" },
      { name: "Environmental Science", credits: 2, code: "21CH103" },
    ],
    "III Semester": [
      {
        name: "Computer Organization and Architecture",
        credits: 3,
        code: "21CS201",
      },
      { name: "Data Structures", credits: 3, code: "21CS202" },
      { name: "Object Oriented Programming", credits: 3, code: "21CS203" },
      { name: "Data Structures Laboratory", credits: 2, code: "21CS204" },
      {
        name: "Object Oriented Programming Laboratory",
        credits: 2,
        code: "21CS205",
      },
      {
        name: "Digital Principles and System Design",
        credits: 4,
        code: "21EC201",
      },
      { name: "Digital Systems Laboratory", credits: 2, code: "21EC212" },
      { name: "Discrete Mathematics", credits: 4, code: "21MA203" },
    ],
    "IV Semester": [
      {
        name: "Stochastic Process and its Applications",
        credits: 4,
        code: "21MA205",
      },
      { name: "Database Management Systems", credits: 3, code: "21CS206" },
      { name: "Design Analysis of Algorithms", credits: 3, code: "21CS207" },
      { name: "Operating Systems", credits: 3, code: "21CS208" },
      { name: "Internet Programming", credits: 3, code: "21CS209" },
      {
        name: "Database Management Systems Laboratory",
        credits: 2,
        code: "21CS210",
      },
      { name: "Operating Systems Laboratory", credits: 2, code: "21CS211" },
      { name: "Internet Programming Laboratory", credits: 2, code: "21CS212" },
    ],
    "V Semester": [
      { name: "Theory of Computation", credits: 3, code: "21CS301" },
      { name: "Constitution of India", credits: 0, code: "21MCCS01" },
      { name: "Computer Networks (TwP)", credits: 4, code: "21CS302" },
      {
        name: "Artificial Intelligence and Machine Learning (TwP)",
        credits: 4,
        code: "21CS303",
      },
      {
        name: "Object Oriented Software Engineering (TwP)",
        credits: 4,
        code: "21CS304",
      },
      { name: "Exploratory Data Analysis (TwP)", credits: 3, code: "21PCS02" },
      { name: "Android App Development (TwP)", credits: 3, code: "21PCS12" },
      { name: "Internshp", credits: 1, code: "Intern01" },
    ],
  };

  const gradePoints = { O: 10, "A+": 9, A: 8, "B+": 7, B: 6, C: 5, U: 0 };

  const handleGradeChange = (semester, subject, grade) => {
    setGrades((prev) => ({
      ...prev,
      [semester]: { ...(prev[semester] || {}), [subject]: grade },
    }));
  };

  const calculateGPA = () => {
    if (!selectedSemester) return;
    const semesterGrades = grades[selectedSemester] || {};
    let totalCredits = 0;
    let totalPoints = 0;

    subjects[selectedSemester].forEach(({ name, credits }) => {
      const grade = semesterGrades[name];
      if (grade) {
        totalCredits += credits;
        totalPoints += (gradePoints[grade] || 0) * credits;
      }
    });

    const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00";
    setGpaResults((prev) => ({ ...prev, [selectedSemester]: gpa }));
    if (parseFloat(gpa) >= 8.0) setShowConfetti(true);
  };

  const calculateCGPA = () => {
    let totalCreditsAllSemesters = 0;
    let totalPointsAllSemesters = 0;

    Object.keys(subjects).forEach((semester) => {
      const semesterGrades = grades[semester] || {};
      subjects[semester].forEach(({ name, credits }) => {
        const grade = semesterGrades[name];
        if (grade) {
          totalCreditsAllSemesters += credits;
          totalPointsAllSemesters += (gradePoints[grade] || 0) * credits;
        }
      });
    });

    const cgpa = totalCreditsAllSemesters
      ? (totalPointsAllSemesters / totalCreditsAllSemesters).toFixed(2)
      : "0.00";
    setCgpaResult(cgpa);
  };

  const exportPdf = () => {
    if (!selectedSemester || !gpaResults[selectedSemester]) {
      alert("Please calculate GPA before exporting.");
      return;
    }
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("GPA Report", 105, 20, { align: "center" });

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text(`Register Number: `, 10, 30);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${registerNumber}`, 60, 30);

    pdf.setFont("helvetica", "bold");
    pdf.text(`Department: `, 10, 40);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Computer Science and Engineering`, 60, 40);

    pdf.setFont("helvetica", "bold");
    pdf.text(`Semester: `, 10, 50);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${selectedSemester}`, 60, 50);

    pdf.setFont("helvetica", "bold");
    pdf.text("Subjects and Grades:", 10, 60);
    let yPos = 70;
    const maxWidth = 130;
    subjects[selectedSemester].forEach(({ name, credits, code }) => {
      const grade = grades[selectedSemester]?.[name] || "N/A";
      pdf.setFont("helvetica", "bold");
      const subjectText = `${code} - ${name} (${credits} Credits): `;
      const splitText = pdf.splitTextToSize(subjectText, maxWidth);

      splitText.forEach((line, index) => {
        pdf.text(line, 10, yPos + index * 5);
      });

      pdf.setFont("helvetica", "normal");
      pdf.text(`${grade}`, 150, yPos);
      yPos += splitText.length * 5 + 5;
    });

    pdf.setFont("helvetica", "bold");
    pdf.text(`Total GPA: `, 10, yPos + 10);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${gpaResults[selectedSemester]}`, 70, yPos + 10);

    pdf.setFont("helvetica", "bold");
    pdf.text(`Cumulative GPA: `, 10, yPos + 20);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${cgpaResult}`, 70, yPos + 20);

    pdf.save(`GPA_Report_${selectedSemester}.pdf`);
  };

  return (
    <div className="h-screen overflow-y-auto flex flex-col items-center ">
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="shadow-md flex items-center justify-between px-4 py-3 w-full ">
        <img src={vcetLogo} alt="VCET Logo" className="h-16" />
        <p className="text-center font-bold text-white text-lg">
          VELAMMAL COLLEGE OF ENGINEERING AND TECHNOLOGY
        </p>
        <img src={cseLogo} alt="CSE Logo" className="h-16" />
      </div>

      <h1 className="text-white text-4xl font-bold text-center mt-10">
        GPA Calculator
      </h1>

      {!isSemesterSelected ? (
        <div className="flex flex-col items-center mt-6">
          <label className="text-white text-lg mb-2">Select Semester:</label>
          <select
            className="p-2 border border-gray-300 rounded-lg bg-white text-black"
            onChange={(e) => {
              const semester = e.target.value;
              setSelectedSemester(semester);
              setIsSemesterSelected(!!semester);
            }}
          >
            <option value="">-- Semester --</option>
            {Object.keys(subjects).map((semester) => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex items-center mt-6">
          <h2 className="text-white text-3xl font-bold">{selectedSemester}</h2>
          <button
            className="ml-4 px-4 py-2 text-white rounded-lg bg-purple-500"
            onClick={() => setIsSemesterSelected(false)}
          >
            Change Semester
          </button>
        </div>
      )}

      {isSemesterSelected && (
        <>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-lg w-full px-4">
            {subjects[selectedSemester].map(({ name, credits, code }) => (
              <div key={name} className=" text-white p-4 rounded-lg shadow-md">
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-gray-400">
                  {credits} Credits
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {code}
                </p>
                <select
                  className="mt-2 p-2 border border-gray-600 rounded-lg text-black w-full custom-select"
                  value={grades[selectedSemester]?.[name] || ""}
                  onChange={(e) =>
                    handleGradeChange(selectedSemester, name, e.target.value)
                  }
                >
                  <option value="">Select Grade</option>
                  {Object.keys(gradePoints).map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="p-6 mt-8 mb-4 rounded-lg shadow-lg w-full max-w-4xl bg-white">
            <h2 className="text-center text-xl font-bold mb-4">GPA Report</h2>
            <p>
              <strong>Register Number:</strong> {registerNumber}
            </p>
            <p>
              <strong>Department:</strong> Computer Science and Engineering
            </p>
            <p>
              <strong>Semester:</strong> {selectedSemester}
            </p>

            <table className="w-full mt-4 border-collapse border border-gray-400">
              <thead>
                <tr className=" text-black bg-purple-400">
                  <th className="p-2 border">Course Code</th>
                  <th className="p-2 border">Subject Name</th>
                  <th className="p-2 border">Credits</th>
                  <th className="p-2 border">Grade</th>
                </tr>
              </thead>
              <tbody>
                {subjects[selectedSemester].map(({ name, credits, code }) => (
                  <tr key={name}>
                    <td className="p-2 border">{code}</td>
                    <td className="p-2 border">{name}</td>
                    <td className="p-2 border">{credits}</td>
                    <td className="p-2 border">
                      {grades[selectedSemester]?.[name] || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-4">
              <strong>Total GPA:</strong>{" "}
              {gpaResults[selectedSemester] || "0.00"}
            </p>
            <p>
              <strong>Cumulative GPA (CGPA):</strong> {cgpaResult}
            </p>
          </div>
        </>
      )}

      <button
        onClick={exportPdf}
        className="mt-6 mb-5 px-6 py-3 text-white rounded-lg"
        style={{ backgroundColor: "#9333ea" }}
      >
        Download GPA Report
      </button>
    </div>
  );
}

export default Cgpa;
