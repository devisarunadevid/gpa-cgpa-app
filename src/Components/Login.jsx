import vcetLogo from "../assets/VCET Logo.jpg";
import cseLogo from "../assets/CSE LOGO.jpg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [RegisterNo, setRegisterNo] = useState("");
  const [RollNo, setRollNo] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        RegisterNo,
        RollNo,
      });
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("RegisterNo", RegisterNo);
        //alert("Login successful!");
        navigate("/cgpa");
      } else {
        alert(response.data.message); 
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again";
      alert(errorMessage);
    }
  };

  return (
    <div>
      <div className="shadow-md flex items-center justify-between px-6 py-3  w-full">
        <img id="vlogo" src={vcetLogo} alt="VCET Logo" className="h-16" />
        <p className="text-center font-bold text-white text-lg">
          VELAMMAL COLLEGE OF ENGINEERING AND TECHNOLOGY
        </p>
        <img id="clogo" src={cseLogo} alt="CSE Logo" className="h-16" />
      </div>

      <div className="flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit}>
          <div className=" bg-blue-900/30 border border-blue-300/30 rounded-2xl p-8 shadow-2xl backdrop-blur-3xl relative w-96">
            <h1 className=" text-white text-4xl font-bold text-center mb-6">
              Login
            </h1>
            <div className="mb-4">
              <label htmlFor="regno" className="block text-gray-300 mb-1">
                Register Number
              </label>
              <input
                type="text"
                name="RegisterNo"
                value={RegisterNo}
                onChange={(e) => setRegisterNo(e.target.value)}
                className="block w-full py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-300 peer"
                required
              ></input>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 mb-1">
                Your Password
              </label>
              <input
                type="password"
                className="block w-full py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:text-white focus:border-blue-300 peer"
                name="RollNo"
                value={RollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required
              ></input>
            </div>
            <div>
              <button
                className="w-full rounded-full bg-amber-300 text-[18px] mt-6 mb-4 text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
