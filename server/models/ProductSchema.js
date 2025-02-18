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
    description : {
        type : String
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema, 'Product');

module.exports = Product;
