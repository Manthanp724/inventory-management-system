const express = require('express');
const router = express.Router();
const {addProduct, getAllProduct, updateProduct, deleteProduct, getProductById} = require('../Controllers/ProductController.js');

router.post("/products", addProduct);

router.get("/products", getAllProduct);

router.get("/products/:productId", getProductById);

router.put("/products/:productId", updateProduct);

router.delete("/products/:productId", deleteProduct);

module.exports = router;