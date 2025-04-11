const express = require('express');
const router = express.Router();
const {addProduct, getAllProduct, updateProduct, deleteProduct, getProductById} = require('../Controllers/ProductController.js');

router.post("/", addProduct);
router.get("/", getAllProduct);
router.get("/:productId", getProductById);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;