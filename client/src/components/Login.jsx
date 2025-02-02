import React, { useState } from 'react';
import image from "../assets/image.png"; // Import image
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { email, password });
  };

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen">

      {/* Left side with image */}
      <div className="w-full md:w-2/5 flex items-center justify-center">
        <img src={image} alt="Image" className="max-w-full max-h-full object-cover" />
      </div>

      {/* Right side with form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Login</h2>
          <p className="text-gray-600 text-sm mb-4 text-center">
            Welcome back! Please enter your credentials to log in.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            >
              Log in
            </button>

            <p className="text-sm text-gray-600 text-center mt-2">
              Don't have an account? <Link to='/signup' className="text-blue-500">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
