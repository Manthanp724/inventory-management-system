import { Button } from "@mui/material";
import React, { useState } from "react";
import Header from "../utils/Header";
const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProductOpen, setUpdatedProductOpen] = useState(false);
  const [showDiscription, setShowDiscription] = useState(false);
  const [currentShowDiscription, setCurrentDiscription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || !name || !stock || !price) {
      alert("All fields are required!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      category,
      name,
      price: parseInt(price),
      stock: parseInt(stock),
      description,
    };

    setProducts([...products, newProduct]);
    setCategory("");
    setName("");
    setStock("");
    setPrice("");
    setDescription("");
    setOpenForm(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    setProducts(
      products.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...selectedProduct,
              price: parseInt(selectedProduct.price),
              stock: parseInt(selectedProduct.stock),
            }
          : product
      )
    );

    setUpdatedProductOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleShowDiscription = (product) => {
    console.log(product);
    setShowDiscription(true);
    setCurrentDiscription(product.description);
  };

  const handleCloseDescription = () => {
    setShowDiscription(false);
    setCurrentDiscription("");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-xl transition-transform transform hover:scale-105 duration-300">
      <Header />
      <div className="flex justify-between items-center mb-6 mt-12">
        <h1 className="text-3xl font-semibold text-gray-800">In Stock</h1>
        <Button
          variant="contained"
          onClick={() => setOpenForm(true)}
          className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 rounded-lg shadow-md transition-all"
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
            Add Product
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
              className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="contained"
              type="submit"
              className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 rounded-lg shadow-md transition-all"
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpenForm(false)}
              className="text-indigo-600 hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-300 rounded-lg transition-all"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        Product List
      </h2>
      {products.length > 0 ? (
        <table className="w-full border-collapse table-auto mt-4 bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-indigo-100 text-gray-700">
              <th className="p-4 border text-left">ID</th>
              <th className="p-4 border text-left">Name</th>
              <th className="p-4 border text-left">Stock</th>
              <th className="p-4 border text-left">Price</th>
              <th className="p-4 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-indigo-50 transition-all"
              >
                <td className="p-4 border">{product.id}</td>
                <td className="p-4 border">{product.name}</td>
                <td className="p-4 border">{product.stock}</td>
                <td className="p-4 border">${product.price}</td>
                <td className="p-4 border flex gap-4">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setSelectedProduct(product);
                      setUpdatedProductOpen(true);
                    }}
                    className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 rounded-lg transition-all"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 rounded-lg transition-all"
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleShowDiscription(product)}
                    className="bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-red-300 rounded-lg transition-all"
                  >
                    Discription
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No Products Found</p>
      )}

      {updatedProductOpen && selectedProduct && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Edit Product
          </h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              value={selectedProduct.name}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  name: e.target.value,
                })
              }
              placeholder="Name"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <input
              type="number"
              value={selectedProduct.stock}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  stock: e.target.value,
                })
              }
              placeholder="Stock"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <input
              type="number"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: e.target.value,
                })
              }
              placeholder="Price"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <textarea
              value={selectedProduct.description}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  description: e.target.value,
                })
              }
              placeholder="Description"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <div className="flex justify-end gap-4 mt-4">
              <Button
                variant="contained"
                type="submit"
                className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 rounded-lg shadow-md transition-all"
              >
                Update Product
              </Button>
              <Button
                variant="outlined"
                onClick={() => setUpdatedProductOpen(false)}
                className="text-indigo-600 hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-300 rounded-lg transition-all"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      {showDiscription && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-xl w-full mx-4 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Product Description
            </h2>
            <p className="text-gray-700 text-base leading-relaxed max-h-60 overflow-y-auto pr-2">
              {currentShowDiscription}
            </p>
            <button
              onClick={handleCloseDescription}
              className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
