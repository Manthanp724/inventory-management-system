import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(name, email, phone, password, organization);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600  px-4">
      <div className="w-full bg-gray-100 backdrop-blur-lg border border-gray-800 shadow-2xl p-8 sm:p-10 rounded-xl max-w-lg ">
        <h2 className="text-3xl font-extrabold text-black text-center mb-6">Create Account</h2>
        <p className="text-black text-center text-sm mb-6">
          Join us and manage your inventory with ease.
        </p>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-100 text-black p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              required
            />
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 text-black p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              required
            />
          </div>

          <div className="relative">
            <input
              type="tel"
              placeholder="Phone No."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-gray-100 text-black p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              required
            />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Organization Name"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full bg-gray-100 text-black p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 text-black p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="text-sm text-black text-center mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 font-semibold hover:underline transition-all">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
