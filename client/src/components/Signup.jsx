import React, { useState } from 'react';
import image from "../assets/image.png"; // Import image
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organizationName, setOrganizationName] = useState('');
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      name,
      email,
      phone,
      organizationName,
      password,
    });
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Register</h2>
          <p className="text-gray-600 text-sm mb-4 text-center">
            Manage all your inventory efficiently. Let's get you all set up.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="tel"
                placeholder="Phone no."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Organization Name"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
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

            <div className="flex items-center">
              <label className="text-gray-600 text-sm">
                I agree to all terms, <a href="#" className="text-blue-500">privacy policies</a>, and fees.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign up
            </button>

            <p className="text-sm text-gray-600 text-center mt-2">
              Already have an account? <Link to= "/" className="text-blue-500">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
