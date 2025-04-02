import React from "react";
import { motion } from "framer-motion";

const OrderForm = ({
  formData,
  setFormData,
  handleAddOrder,
  setShowForm,
  resetForm,
}) => {
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      if (name === "products") {
        const updatedProducts = [...prev.products];
        updatedProducts[index][e.target.dataset.name] = value;
        return { ...prev, products: updatedProducts };
      }
      return { ...prev, [name]: value };
    });
  };

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { product: "", quantity: "" }],
    }));
  };

  const removeProduct = (index) => {
    if (formData.products.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasEmptyProducts = formData.products.some(
      p => !p.product.trim() || !p.quantity
    );
    
    if (hasEmptyProducts) {
      alert("Please fill in all product fields");
      return;
    }

    const orderData = {
      customerName: formData.customerName.trim(),
      customerEmail: formData.customerEmail.trim(),
      products: formData.products.map(p => ({
        product: p.product.trim(),
        quantity: Number(p.quantity),
      })),
    };

    handleAddOrder(orderData);
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => {
            setShowForm(false);
            resetForm();
          }}
          aria-label="Close form"
        >
          ✖
        </button>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Add New Order
          </h2>

          <div>
            <label htmlFor="customerName" className="block text-gray-600 font-semibold mb-1">
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              placeholder="John Doe"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
              required
            />
          </div>

          <div>
            <label htmlFor="customerEmail" className="block text-gray-600 font-semibold mb-1">
              Customer Email
            </label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              placeholder="example@email.com"
              value={formData.customerEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold mb-2">Products</label>
            {formData.products.map((product, index) => (
              <div key={index} className="flex gap-3 items-center mb-3">
                <div className="flex-1 flex gap-3">
                  <input
                    type="text"
                    name="products"
                    data-name="product"
                    placeholder="Product Name"
                    value={product.product}
                    onChange={(e) => handleChange(e, index)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition"
                    required
                  />
                  <input
                    type="number"
                    name="products"
                    data-name="quantity"
                    placeholder="Qty"
                    min="1"
                    value={product.quantity}
                    onChange={(e) => handleChange(e, index)}
                    className="w-20 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition"
                    required
                  />
                </div>
                {formData.products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove product"
                  >
                    ✖
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addProduct}
              className="mt-3 w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>+</span>
              <span>Add Another Product</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition-all shadow-md font-medium"
            >
              Create Order
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default OrderForm;