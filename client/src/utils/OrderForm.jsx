import React, { useState } from "react";

const OrderForm = ({ onSubmit, editOrder }) => {
  const [formData, setFormData] = useState({
    date: "",
    customerName: "",
    customerEmail: "",
    products: [
      {
        product: "",
        quantity: "",
      },
    ],
    status: "Pending",
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };
    if (name === "products") {
      newFormData.products[index][e.target.dataset.name] = value;
    } else {
      newFormData[name] = value;
    }
    setFormData(newFormData);
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { product: "", quantity: "" }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add New Order</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="email"
          name="customerEmail"
          placeholder="Customer Email"
          value={formData.customerEmail}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        {/* Product Inputs */}
        {formData.products.map((product, index) => (
          <div key={index} className="flex gap-4">
            <input
              type="text"
              name="products"
              data-name="product"
              placeholder="Product"
              value={product.product}
              onChange={(e) => handleChange(e, index)}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="number"
              name="products"
              data-name="quantity"
              placeholder="Quantity"
              value={product.quantity}
              onChange={(e) => handleChange(e, index)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addProduct}
          className="bg-green-500 text-white py-2 px-4 rounded mt-2"
        >
          + Add Product
        </button>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 rounded w-full mt-4"
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
