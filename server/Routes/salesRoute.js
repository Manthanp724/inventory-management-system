const express = require("express");
const { 
    getTotalSales, 
    getSalesByCategory, 
    getMonthlySales, 
    getDailySales, 
    getCustomerPurchaseHistory 
} = require('../Controllers/SalesController.js');

const router = express.Router();

// ✅ Get total sales
router.get("/total", getTotalSales);

// ✅ Get sales by category
router.get("/category/:categoryId", getSalesByCategory);

// ✅ Get monthly sales
router.get("/monthly", getMonthlySales);

// ✅ Get daily sales
router.get("/daily", getDailySales);

// ✅ Get customer purchase history
router.get("/customer/:email", getCustomerPurchaseHistory);

module.exports = router;
