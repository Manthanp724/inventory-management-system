import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../utils/Header";
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../Services/ProductService";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    category: "", // Will display category name
    name: "",
    stock: "",
    price: "",
    description: "",
  });
  const [categoryId, setCategoryId] = useState(""); // Stores actual category ID
  const [openForm, setOpenForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productData = await fetchAllProducts();
        setProducts(productData || []);
      } catch (error) {
        setError(error.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      category: "",
      name: "",
      stock: "",
      price: "",
      description: "",
    });
    setCategoryId("");
    setEditingProductId(null);
    setOpenForm(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.category || !formData.name || !formData.stock || !formData.price) {
      setError("All fields except description are required!");
      return;
    }
  
    try {
      setLoading(true);
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: editingProductId ? categoryId : formData.category,
      };
  
      if (editingProductId) {
        const updatedProduct = await updateProduct(editingProductId, productData);
        // Optimistically update with the name we have
        const updatedProductWithCategory = {
          ...updatedProduct,
          category: {
            _id: categoryId,
            name: formData.category
          }
        };
        setProducts(products.map(p => 
          p._id === editingProductId ? updatedProductWithCategory : p
        ));
        
        // Then refetch to ensure we have correct data
        const freshProducts = await fetchAllProducts();
        setProducts(freshProducts || []);
      } else {
        const newProduct = await createProduct(productData);
        setProducts([...products, newProduct]);
      }
      resetForm();
    } catch (error) {
      setError(error.message || "Failed to save product");
      // Optionally refetch products here to reset state
      const freshProducts = await fetchAllProducts();
      setProducts(freshProducts || []);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      setError(error.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      category: product.category?.name || product.category || "", // Show name
      name: product.name || "",
      stock: product.stock?.toString() || "",
      price: product.price?.toString() || "",
      description: product.description || "",
    });
    // Store the actual ID separately
    setCategoryId(product.category?._id || product.category || "");
    setEditingProductId(product._id);
    setOpenForm(true);
  };

  const handleShowDescription = (description) => {
    setCurrentDescription(description || "No description available");
    setShowDescription(true);
  };

  if (loading && products.length === 0) {
    return <div className="text-center p-8">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        Error: {error}
        <Button
          variant="outlined"
          onClick={() => setError(null)}
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-xl">
      <Header />

      <div className="flex justify-between items-center mb-6 mt-12">
        <h1 className="text-3xl font-semibold text-gray-800">Product Inventory</h1>
        <Button
          variant="contained"
          onClick={() => {
            resetForm();
            setOpenForm(true);
          }}
          className="bg-indigo-600 text-white hover:bg-indigo-700"
        >
          + New Product
        </Button>
      </div>

      {openForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg mb-6 space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {editingProductId ? "Edit Product" : "Add Product"}
          </h2>

          {error && <div className="text-red-500">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
              readOnly={!!editingProductId} // Read-only when editing
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              placeholder="Stock Quantity"
              className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
              min="0"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
              min="0"
              step="0.01"
            />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Product Description"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            rows={4}
          />

          <div className="flex justify-end gap-4 mt-4">
            <Button
              type="submit"
              variant="contained"
              className="bg-indigo-600 text-white hover:bg-indigo-700"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : editingProductId
                ? "Update"
                : "Submit"}
            </Button>
            <Button
              variant="outlined"
              onClick={resetForm}
              className="text-indigo-600 hover:bg-indigo-100"
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">Product List</h2>

      {products.length > 0 ? (
        <table className="w-full border-collapse table-auto mt-4 bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-indigo-100 text-gray-700">
              <th className="p-4 border text-left">Name</th>
              <th className="p-4 border text-left">Category</th>
              <th className="p-4 border text-left">Stock</th>
              <th className="p-4 border text-left">Price</th>
              <th className="p-4 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-indigo-50">
                <td className="p-4 border">{product.name}</td>
                <td className="p-4 border">
                  {product.category?.name || product.category || 'Uncategorized'}
                </td>
                <td className="p-4 border">{product.stock}</td>
                <td className="p-4 border">${product.price?.toFixed(2)}</td>
                <td className="p-4 border flex gap-4">
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(product)}
                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white hover:bg-red-700"
                    size="small"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleShowDescription(product.description)}
                    className="bg-green-600 text-white hover:bg-green-700"
                    size="small"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 py-8">No products found</p>
      )}

      {showDescription && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-xl w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Product Description
            </h2>
            <p className="text-gray-700 text-base leading-relaxed max-h-60 overflow-y-auto pr-2">
              {currentDescription}
            </p>
            <div className="flex justify-center mt-6">
              <Button
                variant="contained"
                onClick={() => setShowDescription(false)}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;