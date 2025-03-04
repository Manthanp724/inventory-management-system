import React, { useState } from "react";

const statusColors = {
  Pending: "bg-yellow-500 text-white",
  Processing: "bg-blue-500 text-white",
  Completed: "bg-green-500 text-white",
  Shipped: "bg-purple-500 text-white",
};

const OrderTable = ({ orders, setOrders }) => {
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState({});

  const handleStatusChange = (orderId, status) => {
    setNewStatus((prev) => ({ ...prev, [orderId]: status }));
  };

  const handleUpdateStatus = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus[orderId] || order.status }
          : order
      )
    );
    setEditingOrderId(null); // Hide dropdown after updating
  };

  if (!orders || orders.length === 0) {
    return <p className="text-center text-gray-500 text-lg py-6">No orders found.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-xl bg-white animate-fadeIn">
      <table className="w-full border-collapse bg-white rounded-lg shadow-md relative">
        <thead className="bg-blue-600 text-white sticky top-0">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">Order ID</th>
            <th className="px-6 py-3 text-left font-semibold">Date(yy/mm/dd)</th>
            <th className="px-6 py-3 text-left font-semibold">Customer</th>
            <th className="px-6 py-3 text-left font-semibold">Item Name</th>
            <th className="px-6 py-3 text-left font-semibold">Quantity</th>
            <th className="px-6 py-3 text-left font-semibold">Status</th>
            <th className="px-6 py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className="border-b hover:bg-gray-100 transition-transform duration-200 ease-in-out hover:scale-105"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{order.date}</td>
              <td className="px-6 py-4">{order.customer}</td>
              <td className="px-6 py-4">{order.itemName}</td>
              <td className="px-6 py-4">{order.quantity}</td>
              <td className="px-6 py-4">
                {editingOrderId === order.id ? (
                  <select
                    value={newStatus[order.id] || order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border p-2 rounded bg-gray-100"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Shipped">Shipped</option>
                  </select>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      statusColors[order.status] || "bg-gray-400 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                {editingOrderId === order.id ? (
                  <button
                    onClick={() => handleUpdateStatus(order.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-blue-600 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingOrderId(order.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-green-600 transition"
                  >
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
