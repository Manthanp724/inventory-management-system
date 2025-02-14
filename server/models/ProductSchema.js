const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,  // This tracks available stock
    },
    totalSold: {
        type: Number,
        default: 0,  // Renamed from sold to totalSold
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema, 'Product');

module.exports = Product;
