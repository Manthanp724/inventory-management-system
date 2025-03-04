import { FaBox, FaShoppingCart, FaChartLine, FaUsers, FaBars } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`h-screen bg-blue-600 text-white shadow-lg flex flex-col transition-all duration-700 ease-in-out ${
        isOpen ? "w-40" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-6 flex items-center justify-center p-3 rounded-md hover:bg-blue-700 transition-all duration-500"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar Links */}
      <ul className="space-y-3">
        {[
          { icon: <MdDashboard size={24} />, label: "Dashboard", path: "/" },
          { icon: <FaBox size={24} />, label: "Current Stock", path: "/stock" },
          { icon: <FaShoppingCart size={24} />, label: "Orders", path: "/order" },
          { icon: <FaChartLine size={24} />, label: "Sales", path: "/sales" },
          { icon: <FaUsers size={24} />, label: "Users", path: "/users" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center space-x-4 p-3 rounded-md hover:bg-blue-700 transition-all duration-700 ease-in-out"
          >
            {item.icon}
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out ${
                isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
