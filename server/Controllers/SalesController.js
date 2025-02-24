const Order = require("../models/OrderSchema.js");
const mongoose = require('mongoose');

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

// ✅ Get Sales by Category
const getSalesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Ensure categoryId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid category ID format" });
        }

        const salesByCategory = await Order.aggregate([
            { $unwind: "$products" }, // Break array of products into separate documents
            {
                $lookup: {
                    from: "products",
                    localField: "products.product",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" }, // Unwind product details
            { 
                $match: { "productDetails.category": new mongoose.Types.ObjectId(categoryId) } 
            }, // Filter by categoryId
            {
                $group: {
                    _id: "$productDetails.category",
                    totalRevenue: { $sum: { $multiply: ["$products.quantity", "$productDetails.price"] } },
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
                    totalSold: 1
                }
            }
        ]);

        return res.status(200).json({ message: "Sales by category retrieved", salesByCategory });

    } catch (error) {
        res.status(500).json({ message: "Error fetching sales by category", error: error.message });
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
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: "Customer email is required" });
        }

        const purchaseHistory = await Order.find({ customerEmail: email }).populate("products.product", "name price");

        if (!purchaseHistory.length) {
            return res.status(404).json({ message: "No purchases found for this customer" });
        }

        return res.status(200).json({ message: "Customer purchase history retrieved", purchaseHistory });
    } catch (error) {
        res.status(500).json({ message: "Error fetching purchase history", error: error.message });
    }
};

module.exports = { getTotalSales, getSalesByCategory, getMonthlySales, getDailySales, getCustomerPurchaseHistory };
