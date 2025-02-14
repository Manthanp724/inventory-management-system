const Product = require('../models/ProductSchema.js');


const createProduct = async(req, res) => {
   
    try {
        const {name , category , price , stock, totalSold} = req.body;

        // validating the product order
        if(!name || !category || price === undefined || stock === undefined || totalSold === undefined){
            return res.status(400).json({message : "All fields are required"});
        }

        const newProduct = await Product.create({name , category, price, stock, totalSold});

        return res.status(200).json({message : "New Product created Successfully", newProduct});
    } catch (error) {
        res.status(500).json({message : "Error while creating product" , error});
    }
};

const getAllProduct = async(req, res) => {
    try {
        const products = await Product.find();
        //send the response

        res.status(200).json({message : "All Products", products})

    } catch (error) {
        res.status(500).josn("Error while getting all products", error);
    }
}

const updateProduct = async(req, res) => {

    try {
        const {productId} = req.params;
        const {name , category , price , stock, totalSold} = req.body;

        console.log("Product ID : ", productId);
        

        if(!name || !category || price === undefined || stock === undefined || totalSold === undefined){
            return res.status(400).json({message : "All fields are required"});
        }

        // now find the product and upate it

        const updatedProduct = await Product.findByIdAndUpdate(productId , {
            name,
            category,
            price,
            stock,
            totalSold
        }, {new : true});

        if(!updatedProduct){
            return res.status(500).json({message : "Product not Found"});
        }

        res.status(200).json({message : "Product updated successfully", updatedProduct});
        
    } catch (error) {
        res.status(500).json("Error while Updating product", error)
        console.log(error);
        
    }
}

const deleteProduct = async(req, res) => {
    try {
        const {productId} = req.params;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct){
            return res.status(500).json({message : "Product not found"});
        }
        res.status(200).json({message : "Product deleted Successfully"});
    } catch (error) {
        res.status(500).josn({message : "Error while Delete product"})
    }
}

module.exports = {createProduct, getAllProduct, updateProduct, deleteProduct};