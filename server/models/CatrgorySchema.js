const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },

    description : {
        type: String,
        required : false,
    }
}, {timestamps : true})

const Category = mongoose.model('Category' , categorySchema, 'Category');

module.exports = Category;