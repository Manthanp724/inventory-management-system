import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaCaretDown } from "react-icons/fa";
import image from "../assets/image.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-700 text-white shadow-lg px-6 py-3 fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold text-white tracking-wide transition-all duration-300 transform hover:scale-105"
        >
          IMS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {["Dashboard", "All Orders", "In Stock", "Products"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(" ", "")}`}
              className="text-lg font-medium text-white opacity-90 hover:opacity-100 hover:underline transition-all duration-300 transform hover:scale-105"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Profile & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          {/* Profile Section */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={image}
                alt="Profile"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-white shadow-md transition-transform duration-300 hover:scale-110"
              />
              <FaCaretDown
                className={`text-white transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-3 w-44 bg-white text-gray-800 shadow-lg rounded-lg transition-all duration-300 overflow-hidden ${
                dropdownOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
              }`}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <ul className="py-2">
                <li className="px-5 py-3 hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                  Profile
                </li>
                <li className="px-5 py-3 hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                  Settings
                </li>
                <li className="px-5 py-3 hover:bg-red-100 text-red-600 transition-all duration-200 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-blue-700 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-64 opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center space-y-4 py-4">
          {["Dashboard", "All Orders", "In Stock", "Products"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(" ", "")}`}
              className="text-lg font-medium text-white opacity-90 hover:opacity-100 hover:underline transition-all duration-300"
              onClick={() => setMenuOpen(false)}
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
