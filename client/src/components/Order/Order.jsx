// Order.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import OrderForm from "./OrderForm";
import OrderTable from "./OrderTable";
import Header from "../../utils/Header";
import Search from "../../utils/Search";
import { FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const statusColors = {
  Pending: "bg-amber-100 text-amber-800 border-amber-300",
  Processing: "bg-blue-100 text-blue-800 border-blue-300",
  Shipped: "bg-indigo-100 text-indigo-800 border-indigo-300",
  Delivered: "bg-emerald-100 text-emerald-800 border-emerald-300",
  Cancelled: "bg-rose-100 text-rose-800 border-rose-300",
};

const ITEMS_PER_PAGE = 8;

const Order = () => {
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8080/orders");
        setOrders(response.data.orders || []);
        setFilteredOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...orders];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerEmail
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      result = result.filter((order) => order.status === statusFilter);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredOrders(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [orders, searchTerm, sortConfig, statusFilter]);

  // Request sort
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Add new order
  const handleAddOrder = async (newOrder) => {
    try {
      console.log("sending data from the form : ", newOrder);

      const response = await axios.post("http://localhost:8080/orders", {
        ...newOrder,
        status: "Pending",
        createdAt: new Date().toISOString(),
      });
      setOrders([...orders, response.data.order]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  // Update order status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      // 1. Get current order data first
      const originalOrder = orders.find((o) => o._id === orderId);

      // 2. Send status update
      await axios.put(`http://localhost:8080/orders/${orderId}`, {
        status: newStatus,
      });

      // 3. Update locally without losing data
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: newStatus } // Preserve all other fields
            : order
        )
      );

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
      setOrders(orders.filter((o) => o._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="mt-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Order Management
            </h1>
            <p className="text-gray-500 mt-1">
              {filteredOrders.length}{" "}
              {filteredOrders.length === 1 ? "order" : "orders"} found
            </p>
          </div>
          <div
            className="
        bg-blue-600 
        text-white 
          px-4 py-2 
          rounded-md 
          transition-colors duration-150
          font-medium
          "
          >
            <button
              className="focus:outline-none"
              onClick={() => setShowForm(true)}
            >
              + Create New Order
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Search
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search orders..."
              className="flex-1"
            />

            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FiFilter className="text-gray-600" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="All">All Statuses</option>
                    {Object.keys(statusColors).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <OrderTable
          orders={paginatedOrders}
          isLoading={isLoading}
          onEdit={setEditingOrder}
          onDelete={handleDeleteOrder}
          sortConfig={sortConfig}
          requestSort={requestSort}
        />

        {/* Pagination */}
        {filteredOrders.length > ITEMS_PER_PAGE && (
          <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-lg border border-gray-200">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiChevronLeft />
              Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Next
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Order Form Modal */}
      <AnimatePresence>
        {showForm && (
          <OrderForm
            handleAddOrder={handleAddOrder}
            setShowForm={setShowForm}
          />
        )}
      </AnimatePresence>

      {/* Status Edit Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Update Order Status
            </h3>
            <p className="text-gray-600 mb-6">
              Order #{orders.findIndex((o) => o._id === editingOrder._id) + 1} •{" "}
              {editingOrder.customerName}
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Status
              </label>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  statusColors[editingOrder.status]
                }`}
              >
                {editingOrder.status}
              </span>
            </div>

            <div className="mb-6">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Status
              </label>
              <select
                id="status"
                value={editingOrder.status}
                onChange={(e) =>
                  setEditingOrder({ ...editingOrder, status: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {Object.keys(statusColors).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditingOrder(null)}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleUpdateStatus(editingOrder._id, editingOrder.status)
                }
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
