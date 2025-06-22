import { Route, Routes } from "react-router-dom";
import Cgpa from "./Components/Cgpa";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Components/Login";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios
      .get("https://gpa-cgpa-backends.onrender.com")
      .then((response) => setMessage(response.data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black h-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/cgpa" element={<Cgpa />}></Route>
      </Routes>
      <p>Message from Backend: {message}</p>
    </div>
  );
}

export default App;
