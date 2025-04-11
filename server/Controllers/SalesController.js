const Order = require("../models/OrderSchema.js");
const mongoose = require('mongoose');
const Product  = require("../models/ProductSchema.js")
// ✅ Get Total Sales Data
const getTotalSales = async (req, res) => {
    try {
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" },
                    totalOrders: { $sum: 1 }
                }
            }
        ]);

        return res.status(200).json({ message: "Total sales data retrieved", totalSales });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total sales", error: error.message });
    }
};

// ✅ Get Sales by Category which is not working now. Tried a lot but not working.
const getSalesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { startDate, endDate, sort } = req.query;

        // Validate category ID format
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid category ID format" });
        }

        // Create base pipeline
        const pipeline = [
            { $unwind: "$products" },
            {
                $lookup: {
                    from: "products",
                    localField: "products.product",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" },
            { 
                $match: { 
                    "productDetails.category": new mongoose.Types.ObjectId(categoryId) 
                } 
            }
        ];

        // Add date filtering if provided
        if (startDate && endDate) {
            pipeline[3].$match.createdAt = { 
                $gte: new Date(startDate), 
                $lte: new Date(endDate) 
            };
        } else if (startDate || endDate) {
            return res.status(400).json({
                message: "Please provide both startDate and endDate, or neither"
            });
        }

        // Continue with the rest of the pipeline
        pipeline.push(
            {
                $group: {
                    _id: "$productDetails.category",
                    totalRevenue: { 
                        $sum: { 
                            $multiply: ["$products.quantity", "$productDetails.price"] 
                        } 
                    },
                    totalSold: { $sum: "$products.quantity" }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            { $unwind: "$categoryDetails" },
            {
                $project: {
                    categoryName: "$categoryDetails.name",
                    totalRevenue: 1,
                    totalSold: 1,
                    _id: 0
                }
            }
        );

        // Add sorting if specified
        if (sort) {
            pipeline.push({ 
                $sort: { totalRevenue: sort === "asc" ? 1 : -1 } 
            });
        }

        const salesByCategory = await Order.aggregate(pipeline);

        return res.status(200).json({ 
            message: salesByCategory.length > 0 
                ? "Sales by category retrieved" 
                : "No sales found for this category",
            salesByCategory
        });
    } catch (error) {
        console.error("Error in getSalesByCategory:", error);
        res.status(500).json({ 
            message: "Error fetching sales by category", 
            error: error.message 
        });
    }
};


// ✅ Get Monthly Sales Report
const getMonthlySales = async (req, res) => {
    try {
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
                    totalRevenue: { $sum: "$totalAmount" },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        return res.status(200).json({ message: "Monthly sales data retrieved", monthlySales });
    } catch (error) {
        res.status(500).json({ message: "Error fetching monthly sales", error: error.message });
    }
};

// ✅ Get Daily Sales Report
const getDailySales = async (req, res) => {
    try {
        const dailySales = await Order.aggregate([
            {
                $group: {
                    _id: { day: { $dayOfMonth: "$createdAt" }, month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
                    totalRevenue: { $sum: "$totalAmount" },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
        ]);

        return res.status(200).json({ message: "Daily sales data retrieved", dailySales });
    } catch (error) {
        res.status(500).json({ message: "Error fetching daily sales", error: error.message });
    }
};

// ✅ Get Customer Purchase History
const getCustomerPurchaseHistory = async (req, res) => {
    try {
        const { email } = req.query; // Changed from req.params to req.query

        if (!email) {
            return res.status(400).json({ message: "Customer email is required" });
        }

        const purchaseHistory = await Order.find({ customerEmail: email })
            .populate("products.product", "name price")
            .sort({ createdAt: -1 }); // Added sorting by newest first

        if (!purchaseHistory.length) {
            return res.status(404).json({ message: "No purchases found for this customer" });
        }

        return res.status(200).json({ 
            message: "Customer purchase history retrieved", 
            data: purchaseHistory // Changed from purchaseHistory to data for consistency
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching purchase history", 
            error: error.message 
        });
    }
};

module.exports = { getTotalSales, getSalesByCategory, getMonthlySales, getDailySales, getCustomerPurchaseHistory };
