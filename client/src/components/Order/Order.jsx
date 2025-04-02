import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import OrderForm from "./OrderForm";
import OrderTable from "./OrderTable";
import Header from "../../utils/Header";
import Search from "../../utils/Search";

const statusColors = {
  Pending: "bg-yellow-500 text-white",
  Processing: "bg-blue-500 text-white",
  Shipped: "bg-purple-500 text-white",
  Delivered: "bg-green-500 text-white",
  Cancelled: "bg-red-500 text-white",
};

const Order = () => {
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    products: [{ product: "", quantity: "" }],
  });

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8080/orders");
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Add new order
  const handleAddOrder = async (newOrder) => {
    try {
      const response = await axios.post("http://localhost:8080/orders", newOrder);
      setOrders([...orders, response.data.order]);
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  // Update order status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/orders/${orderId}`,
        { status: newStatus }
      );
      setOrders(orders.map(o => o._id === orderId ? response.data.order : o));
      setEditingOrder(null);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Delete order
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    
    try {
      await axios.delete(`http://localhost:8080/orders/${orderId}`);
      setOrders(orders.filter(o => o._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      customerName: "",
      customerEmail: "",
      products: [{ product: "", quantity: "" }],
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden p-4">
      <Header />
      <div className="mt-8">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          <Button
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md mt-4 lg:mt-0"
            onClick={() => setShowForm(true)}
          >
            + New Order
          </Button>
        </div>

        <div className="mt-2 flex flex-col lg:flex-row gap-4 items-center">
          <Search />
        </div>
        
        <OrderTable 
          orders={orders} 
          isLoading={isLoading}
          onEdit={setEditingOrder}
          onDelete={handleDeleteOrder}
        />
      </div>

      <AnimatePresence>
        {showForm && (
          <OrderForm
            formData={formData}
            setFormData={setFormData}
            handleAddOrder={handleAddOrder}
            setShowForm={setShowForm}
            resetForm={resetForm}
          />
        )}
      </AnimatePresence>

      {/* Status Edit Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              Update Status for Order #{orders.findIndex(o => o._id === editingOrder._id) + 1}
            </h3>
            <select
              value={editingOrder.status}
              onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value})}
              className="w-full p-2 border rounded mb-4"
            >
              {Object.keys(statusColors).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setEditingOrder(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleUpdateStatus(editingOrder._id, editingOrder.status)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;