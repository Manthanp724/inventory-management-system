import React, { useState } from "react";

const OrderForm = ({ setShowForm , setOrders}) => {
  const [formData, setFormData] = useState({
    date: "",
    customer: "",
    organization: "",
    description: "",
    itemName: "",
    quantity: "",
    status: "Pending",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
    setOrders( prevOrder => [...prevOrder , formData]);
    setShowForm(false); // Hide form after submit
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setShowForm(false); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-xl border border-gray-200 mt-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add New Order</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 hover:border-gray-400"
            required
          />
        </div>

        {/* Customer Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
          <input
            type="text"
            name="customer"
            placeholder="Enter customer name"
            value={formData.customer}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Organization Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
          <input
            type="text"
            name="organization"
            placeholder="Enter organization name"
            value={formData.organization}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Item Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
          <input
            type="text"
            name="itemName"
            placeholder="Enter item name"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Status Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Process">Process</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Description Textarea */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            placeholder="Enter order description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex space-x-4">
          <button
            type="submit"
            className=" cursor-pointer w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Order
          </button>
          <button
            type="button"
            className="cursor-pointer w-full bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
