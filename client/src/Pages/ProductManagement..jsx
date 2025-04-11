import React, { useEffect, useState, useMemo, useCallback } from "react";
import Header from "../utils/Header";
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchAllCategories,
} from "../Services/ProductService";
import {
  Edit,
  Delete,
  Visibility,
  Add,
  Close,
  ArrowBack,
} from "@mui/icons-material";

const ProductManagement = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    stock: "",
    price: "",
    description: "",
  });
  const [categoryId, setCategoryId] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [category, setCategory] = useState([]);

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Data fetching with cleanup
  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const productData = await fetchAllProducts();
        if (isMounted) {
          setProducts(productData || []);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message || "Failed to load products");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Load Category

  useEffect ( () => {
    const loadCategory = async () => {
      try {
        const cat = await fetchAllCategories();
        console.log("Categories loaded:", cat);
        setCategory(cat);
      } catch (error) {
        console.log("Error while load category: ", error);
        setError(error);
      }
    }
    loadCategory()
  },[])

  // Optimized filtering with useMemo
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        (product.category?.name || product.category || "")
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase())
    );
  }, [products, debouncedSearchTerm]);

  // Memoized handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
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
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (
        !formData.category ||
        !formData.name ||
        !formData.stock ||
        !formData.price
      ) {
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
          const updatedProduct = await updateProduct(
            editingProductId,
            productData
          );
          setProducts((prev) =>
            prev.map((p) =>
              p._id === editingProductId
                ? {
                    ...updatedProduct,
                    category: {
                      _id: categoryId,
                      name: formData.category,
                    },
                  }
                : p
            )
          );
        } else {
          const newProduct = await createProduct(productData);
          setProducts((prev) => [...prev, newProduct]);
        }
        resetForm();
      } catch (error) {
        setError(error.message || "Failed to save product");
      } finally {
        setLoading(false);
      }
    },
    [formData, editingProductId, categoryId, resetForm]
  );

  const handleDelete = useCallback(async (id) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      setError(error.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = useCallback((product) => {
    setFormData({
      category: product.category?.name || product.category || "",
      name: product.name || "",
      stock: product.stock?.toString() || "",
      price: product.price?.toString() || "",
      description: product.description || "",
    });
    setCategoryId(product.category?._id || product.category || "");
    setEditingProductId(product._id);
    setOpenForm(true);
  }, []);

  const handleShowDescription = useCallback((description) => {
    setCurrentDescription(description || "No description available");
    setShowDescription(true);
  }, []);

  // Stats calculations with useMemo
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalStock = products.reduce(
      (sum, product) => sum + (product.stock || 0),
      0
    );
    const totalValue = products.reduce(
      (sum, product) => sum + (product.stock * product.price || 0),
      0
    );
    const totalCategories = new Set(
      products.map((p) => p.category?.name || p.category || "")
    ).size;

    return { totalProducts, totalStock, totalValue, totalCategories };
  }, [products]);

  // Loading skeleton
  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-full">
          {/* Skeleton Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-xl p-6 h-24 animate-pulse"
              ></div>
            ))}
          </div>

          {/* Skeleton Table Header */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="h-16 bg-gray-100 animate-pulse"></div>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="p-4 border-b border-gray-200 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Error: {error}
          </h2>
          <button
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 mx-auto"
            onClick={() => setError(null)}
          >
            <ArrowBack className="h-5 w-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-full">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Product Inventory
          </h1>
          <div className="flex gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 flex-grow sm:flex-grow-0 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => {
                resetForm();
                setOpenForm(true);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm flex items-center gap-2 whitespace-nowrap transition-colors"
            >
              <Add className="h-5 w-5" />
              New Product
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500 bg-opacity-20 rounded-full mr-4">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg opacity-80">Total Products</p>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-green-500 bg-opacity-20 rounded-full mr-4">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg opacity-80">In Stock</p>
                <p className="text-2xl font-bold">{stats.totalStock}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-purple-500 bg-opacity-20 rounded-full mr-4">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg opacity-80">Total Value</p>
                <p className="text-2xl font-bold">
                  ${stats.totalValue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-600 to-amber-400 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-amber-500 bg-opacity-20 rounded-full mr-4">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg opacity-80">Categories</p>
                <p className="text-2xl font-bold">{stats.totalCategories}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Form Modal */}
        {openForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingProductId ? "Edit Product" : "Add Product"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Close className="h-6 w-6" />
                  </button>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a category</option>
                        {category.map((cat) => (
                          <option key={cat._id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                          min="0"
                          step="0.01"
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      disabled={loading}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm text-sm font-medium disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading ? (
                        <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                      ) : null}
                      {editingProductId ? "Update Product" : "Add Product"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Product List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Product List
            </h2>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <ProductRow
                      key={product._id}
                      product={product}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onShowDescription={handleShowDescription}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No products found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try a different search term"
                  : "Get started by adding a new product"}
              </p>
            </div>
          )}
        </div>

        {/* Description Modal */}
        {showDescription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Product Description
                  </h2>
                  <button
                    onClick={() => setShowDescription(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Close className="h-6 w-6" />
                  </button>
                </div>
                <div className="prose max-w-none">
                  {currentDescription || (
                    <p className="text-gray-500 italic">
                      No description available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Memoized Product Row Component
const ProductRow = React.memo(
  ({ product, onEdit, onDelete, onShowDescription }) => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">
            {product.name.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {product.name}
            </div>
            <div className="text-sm text-gray-500 truncate max-w-xs">
              {product.description?.substring(0, 50)}
              {product.description?.length > 50 ? "..." : ""}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {product.category?.name || product.category || "Uncategorized"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
            product.stock > 10
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.stock}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${product.price?.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
            product.stock > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(product)}
            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
            title="Edit"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
            title="Delete"
          >
            <Delete className="h-5 w-5" />
          </button>
          <button
            onClick={() => onShowDescription(product.description)}
            className="text-purple-600 hover:text-purple-900 p-1 rounded-full hover:bg-purple-50"
            title="View Description"
          >
            <Visibility className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  )
);

export default ProductManagement;
