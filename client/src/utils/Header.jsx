import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaCaretDown } from "react-icons/fa";
import image from "../assets/image.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-700 text-white shadow-xl px-8 py-4 rounded-xl w-full z-40">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    <Link to="/" className="text-3xl font-extrabold tracking-wide">
      IMS
    </Link>
    <nav className="hidden md:flex space-x-8">
      {["Dashboard", "Orders", "Current Stock", "Sales"].map((item) => (
        <Link
          key={item}
          to={`/${item.toLowerCase().replace(" ", "")}`}
          className="text-lg font-medium hover:underline hover:opacity-90"
        >
          {item}
        </Link>
      ))}
    </nav>
    <div className="flex items-center space-x-4">
      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <img
            src={image}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
          <FaCaretDown
            className={`transition-transform duration-300 ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
        <div
          className={`absolute right-0 mt-3 w-44 bg-white text-gray-800 shadow-xl rounded-xl transition-all duration-300 overflow-hidden ${
            dropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
          }`}
        >
          <ul className="py-2">
            <li className="px-5 py-3 hover:bg-red-100 text-red-600 cursor-pointer">Logout</li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white text-2xl"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  </div>

  {/* Mobile Navigation */}
  <div
    className={`md:hidden fixed top-16 left-0 w-full bg-gradient-to-r from-blue-500 to-purple-700 rounded-b-xl transition-all duration-300 overflow-hidden ${
      menuOpen ? "max-h-64 opacity-100 visible" : "max-h-0 opacity-0 invisible"
    }`}
  >
    <nav className="flex flex-col items-center space-y-4 py-4">
      {["Dashboard", "All Orders", "In Stock", "Products"].map((item) => (
        <Link
          key={item}
          to={`/${item.toLowerCase().replace(" ", "")}`}
          onClick={() => setMenuOpen(false)}
          className="text-lg font-medium hover:underline hover:opacity-90"
        >
          {item}
        </Link>
      ))}
    </nav>
  </div>
</header>

  );
};

export default Header;
