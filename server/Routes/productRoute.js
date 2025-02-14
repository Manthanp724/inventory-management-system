const express = require('express');
const {createProduct, getAllProduct, updateProduct, deleteProduct} = require('../Controllers/ProductController.js');
const router = express.Router();

router.post("/product", createProduct);
router.get("/get-products", getAllProduct);
router.put("/product/:productId", updateProduct);
router.delete("/product/:productId", deleteProduct);
module.exports = router;