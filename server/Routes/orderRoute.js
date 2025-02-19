const express = require('express');
const {createOrder, getAllOrders, getOrderByID, updateOrder, deleteOrder} = require('../Controllers/OrderController');
const router = express.Router();

router.post("/new", createOrder);
router.get("/orders", getAllOrders)
router.get("/get-order/:id", getOrderByID)
router.put('/get-order/:id', updateOrder)
router.delete('/get-order/:id', deleteOrder)

module.exports = router;