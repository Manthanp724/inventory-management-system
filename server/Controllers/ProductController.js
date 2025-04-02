const Product = require("../models/ProductSchema.js");
const Category = require("../models/CatrgorySchema.js");

// Helper function to resolve category (name to ID)
const resolveCategory = async (categoryInput) => {
  // If it's already a valid ObjectId, use it directly
  if (categoryInput.match(/^[0-9a-fA-F]{24}$/)) {
    return categoryInput;
  }
  
  // Otherwise, find by name
  const category = await Category.findOne({ name: categoryInput });
  return category?._id || null;
};

const addProduct = async (req, res) => {
  try {
    const { name, category, price, stock, description } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ 
        success: false,
        message: "Name, category, and price are required" 
      });
    }

    // Resolve category name to ID
    const categoryId = await resolveCategory(category);
    if (!categoryId) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    const product = await Product.create({
      name,
      category: categoryId,
      price,
      stock,
      description,
    });

    // Return populated category data
    const populatedProduct = await Product.findById(product._id).populate('category', 'name');

    res.status(201).json({ 
      success: true,
      message: "Product created successfully", 
      product: populatedProduct 
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ 
      success: false,
      message: "Error while creating product",
      error: error.message 
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, category, price, stock, description } = req.body;

    // Resolve category name to ID
    const categoryId = await resolveCategory(category);
    if (!categoryId) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        category: categoryId,
        price,
        stock,
        description,
      },
      { new: true, runValidators: true }
    ).populate('category', 'name');

    if (!updatedProduct) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }

    res.status(200).json({ 
      success: true,
      message: "Product updated successfully", 
      updatedProduct 
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ 
      success: false,
      message: "Error while updating product",
      error: error.message 
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort, order } = req.query;
    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortOptions = {};
    if (sort) {
      const sortFields = { name: "name", price: "price", date: "createdAt" };
      sortOptions[sortFields[sort] || "createdAt"] = order === "asc" ? 1 : -1;
    }

    const products = await Product.find(filter)
      .populate("category", "name")
      .sort(sortOptions);

    const count = await Product.countDocuments(filter);

    res.status(200).json({ 
      success: true,
      message: "Products retrieved successfully", 
      totalProducts: count, 
      products 
    });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ 
      success: false,
      message: "Error while getting products",
      error: error.message 
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate("category", "name");

    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }

    res.status(200).json({ 
      success: true,
      message: "Product retrieved successfully", 
      product 
    });
  } catch (error) {
    console.error("Error getting product:", error);
    return res.status(500).json({ 
      success: false,
      message: "Error while getting product",
      error: error.message 
    });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }
    
    res.status(200).json({ 
      success: true,
      message: "Product deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ 
      success: false,
      message: "Error while deleting product",
      error: error.message 
    });
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};