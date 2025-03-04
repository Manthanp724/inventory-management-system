import React, { useState } from "react";
import { Button } from "@mui/material";
import { FaFilter, FaCalendarAlt } from "react-icons/fa";
import Sidebar from "./SideBar/SideBar";
import Header from "../utils/Header";
import Search from "../utils/Search";
import OrderTable from "../components/OrderTable";
import OrderForm from "../utils/OrderForm";
import { motion, AnimatePresence } from "framer-motion";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editOrder, setEditOrder] = useState(null);

  const handleAddOrder = (newOrder) => {
    if (editOrder) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === editOrder.id ? { ...editOrder, ...newOrder } : order
        )
      );
    } else {
      setOrders([...orders, { ...newOrder, id: orders.length + 1 }]);
    }
    setShowForm(false);
    setEditOrder(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="p-6 mt-12">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
            <Button
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md transform hover:scale-105"
              onClick={() => {
                setEditOrder(null);
                setShowForm(true);
              }}
            >
              + New Order
            </Button>
          </div>
          <div className="mt-2 flex gap-4 items-center">
            <Search />
            <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
              <FaCalendarAlt /> Date
            </button>
            <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
              <FaFilter /> Filter
            </button>
          </div>
          <div className="mt-4 bg-white p-4 rounded-lg shadow-lg overflow-hidden animate-fadeIn overflow-y-auto h-[calc(100vh-200px)]">
            {/* ✅ Pass setOrders to OrderTable */}
            <OrderTable orders={orders} setOrders={setOrders} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => setShowForm(false)}
              >
                ✖
              </button>
              <OrderForm onSubmit={handleAddOrder} editOrder={editOrder} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Order;
