import React from "react";
import image from "../assets/image.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center h-13 bg-white shadow-md px-8 rounded-lg">
      <div className="pl-4">
        <Link className="text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
          IMS
        </Link>
      </div>

      <div className="flex justify-center items-center gap-20">
        <Link
          className="text-lg font-normal text-gray-600 hover:text-blue-800 transition-colors duration-300"
          to="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="text-lg font-normal text-gray-600 hover:text-blue-600 transition-colors duration-300"
          to="/stocks"
        >
          In Stock
        </Link>
        <Link
          className="text-lg font-normal text-gray-600 hover:text-blue-600 transition-colors"
          to="/product"
        >
          Products
        </Link>
      </div>

      <div className="pr-4">
        <img
          src={image} 
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 shadow-lg transform transition-transform duration-300 hover:scale-110"
        />
      </div>
    </div>
  );
};

export default Header;
