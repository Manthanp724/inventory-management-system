const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    quantity :{
        type : Number,
        required : true,
        default : 0,
    },
    sold :{
        type : Number,
        default : 0,
    }
},{timestamps  : true})

const Product = mongoose.Model('Product', productSchema, 'Product');

module.exports = Product;