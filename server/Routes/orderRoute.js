const express = require('express');
const {createOrder, getAllOrders, getOrderByID, updateOrder, deleteOrder} = require('../Controllers/OrderController');
const router = express.Router();

router.post("/orders", createOrder);

router.get("/orders", getAllOrders);

router.get("/orders/:id", getOrderByID);

router.put("/orders/:id", updateOrder);

router.delete("/orders/:id", deleteOrder);

module.exports = router;