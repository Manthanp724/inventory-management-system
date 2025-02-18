const express = require('express');
const {addCategory , getAllCategory, updateCategory, deleteCategory} = require('../Controllers/CategoryController');

const router = express.Router();

router.post("/new" , addCategory);
router.get("/get-category", getAllCategory )
router.put('/update/:categoryId', updateCategory);
router.delete('/delete/:categoryId', deleteCategory);

module.exports = router;