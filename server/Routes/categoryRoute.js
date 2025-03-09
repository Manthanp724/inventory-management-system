const express = require('express');
const {addCategory , getAllCategory, updateCategory, deleteCategory} = require('../Controllers/CategoryController');

const router = express.Router();

router.post("/categories", addCategory);

router.get("/categories", getAllCategory);

router.put("/categories/:categoryId", updateCategory);

router.delete("/categories/:categoryId", deleteCategory);


module.exports = router;