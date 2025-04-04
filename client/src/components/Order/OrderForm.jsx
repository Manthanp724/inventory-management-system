// OrderForm.js - Simplified version without prices
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiMinus } from "react-icons/fi";
import axios from "axios";

const OrderForm = ({ handleAddOrder, setShowForm }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    products: [{ product: "", quantity: 1 }],
  });

  const [availableProducts, setAvailableProducts] = useState([]);

  // Fetch available products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products");
        setAvailableProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      if (name === "products") {
        const updatedProducts = [...prev.products];
        updatedProducts[index][e.target.dataset.name] = e.target.dataset.name === 'quantity' ? parseInt(value) || 0 : value;
        return { ...prev, products: updatedProducts };
      }
      return { ...prev, [name]: value };
    });
  };

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { product: "", quantity: 1 }],
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

    const hasEmptyFields = !formData.customerName.trim() || 
                         !formData.customerEmail.trim() ||
                         formData.products.some(p => !p.product || p.quantity < 1);

    if (hasEmptyFields) {
      alert("Please fill in all required fields and ensure quantities are at least 1");
      return;
    }

    const orderData = {
      customerName: formData.customerName.trim(),
      customerEmail: formData.customerEmail.trim(),
      products: formData.products.map(p => ({
        product: p.product,
        quantity: p.quantity
      })),
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    handleAddOrder(orderData);
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Create New Order</h2>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors p-1"
            onClick={() => setShowForm(false)}
            aria-label="Close form"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                placeholder="John Doe"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>

            <div>
              <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Customer Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                placeholder="example@email.com"
                value={formData.customerEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Products</h3>
              <button
                type="button"
                onClick={addProduct}
                className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm"
              >
                <FiPlus size={16} />
                Add Product
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.products.map((product, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-end">
                  <div className="col-span-12 md:col-span-8">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="products"
                      data-name="product"
                      value={product.product}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                      required
                    >
                      <option value="">Select a product</option>
                      {availableProducts.map(p => (
                        <option key={p._id} value={p._id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-span-12 md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Qty <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          if (product.quantity > 1) {
                            handleChange({
                              target: {
                                name: "products",
                                dataset: { name: "quantity" },
                                value: product.quantity - 1
                              }
                            }, index);
                          }
                        }}
                        className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                        disabled={product.quantity <= 1}
                      >
                        <FiMinus size={14} />
                      </button>
                      <input
                        type="number"
                        name="products"
                        data-name="quantity"
                        min="1"
                        value={product.quantity}
                        onChange={(e) => handleChange(e, index)}
                        className="w-full px-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm text-center"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => handleChange({
                          target: {
                            name: "products",
                            dataset: { name: "quantity" },
                            value: product.quantity + 1
                          }
                        }, index)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {formData.products.length > 1 && (
                    <div className="col-span-12 md:col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                        aria-label="Remove product"
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              All fields marked with <span className="text-rose-500">*</span> are required
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
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