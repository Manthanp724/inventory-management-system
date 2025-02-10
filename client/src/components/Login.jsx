import React, { useState, useSyncExternalStore } from "react";
import image from "../assets/image.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND-URL;
// const navigate = useNavigate();


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/user/v1/login`, {email , password});
      // Assuming successful signup and moving to the dashboard page
      // navigate('/dashboard');
      console.log("Response: " , response.data);
    } catch (error) {
      setError("An error has occured while login. Please try again");
    }
    console.log("Form submitted:", { email, password });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white shadow-2xl rounded-xl flex flex-row w-full max-w-5xl overflow-hidden transform transition-all hover:scale-105 duration-300">
        
        {/* Left Side - Image */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center p-6">
          <img
            src={image}
            alt="Inventory"
            className="w-72 lg:w-96 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
              Login
            </h2>
            <p className="text-gray-600 text-sm text-center mb-6">
              Welcome back! Please enter your credentials.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                Log in
              </button>

              <p className="text-sm text-center mt-4 text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
