import React from "react";
import image from "../assets/image.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg px-8 py-2 rounded-b-2xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className="pl-4 transform hover:scale-105 transition-transform duration-300">
          <Link className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 hover:from-blue-200 hover:to-white transition-all duration-300">
            IMS
          </Link>
        </div>

        <nav className="flex justify-center items-center space-x-8">
          {['Dashboard', 'All Orders', 'In Stock', 'Products'].map((item) => (
            <Link
              key={item}
              className="text-lg font-medium text-white opacity-80 hover:opacity-100 hover:underline transform hover:scale-105 transition-all duration-300"
              to={`/${item.toLowerCase().replace(' ', '')}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="pr-4 relative group">
          <img
            src={image} 
            alt="Profile"
            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:border-blue-300"
          />
          <div className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white transform translate-x-1 -translate-y-1 group-hover:scale-125 transition-all duration-300"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
