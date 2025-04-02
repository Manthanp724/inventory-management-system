import React, { useState, useContext } from "react";
import image from "../../assets/image.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, loading } = useContext(AuthContext); // Use AuthContext

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(name, email, phone, password, organization);
    if (success) {
      navigate("/dashboard"); // Redirect on successful signup
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white shadow-2xl rounded-xl flex flex-row w-full max-w-5xl overflow-hidden transform transition-all hover:scale-105 duration-300">

        {/* Left Side - Image */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center p-6">
          <img src={image} alt="Signup" className="w-72 lg:w-96 object-contain drop-shadow-2xl" />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Register</h2>
            <p className="text-gray-600 text-sm text-center mb-6">
              Manage all your inventory efficiently. Let's get you all set up.
            </p>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />

              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone no."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Organization Name"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
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
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>

              <p className="text-sm text-gray-600 text-center mt-4">
                Already have an account?{" "}
                <Link to="/" className="text-blue-600 font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
