const express = require('express');
const {addProduct, getAllProduct, updateProduct, deleteProduct, getProductById} = require('../Controllers/ProductController.js');
const router = express.Router();

router.post("/product", addProduct);
router.get("/get-products", getAllProduct);
router.get("/product/:productId", getProductById);
router.put('/product/:productId', updateProduct)
router.delete("/product/:productId", deleteProduct);
module.exports = router;