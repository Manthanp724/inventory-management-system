const Product = require('../models/ProductSchema.js');
const Category = require('../models/CatrgorySchema.js')


const addProduct = async(req, res) => {
   
    try {
        const { name, category, price, stock, description} = req.body;

        // validating the product order
        if (!name || !category || !price) {
            return res.status(400).json({ message: "Name, category, and price are required" });
        }

        const existingProduct = await Product.findOne({name});

        if(existingProduct){
            return res.status(501).json({message : "Producy already exists"});
        }



        const product = await Product.create({name , category, price, stock, description});

        return res.status(200).json({message : "New Product created Successfully", product});
    } catch (error) {
        res.status(500).json({message : "Error while creating product" , error});
    }
};

const getAllProduct = async(req, res) => {
    try {
        const products = await Product.find().populate('category', 'name');
        res.status(200).json({message : "Success", products})

    } catch (error) {
        res.status(500).josn("Error while getting all products", error.message);
    }
}

const getProductById = async(req, res) => {
    try {
        const {productId} = req.params;

        const getProduct = await Product.findById(productId).populate("category", "name");

        if(!getProduct){
            return res.status(500).json({message : "Product not found"});
        }

        res.status(200).json({message : "Success", getProduct});

    } catch (error) {
        return res.status(500).json({message : "Error while getting Product", error})
    }
}

const updateProduct = async(req, res) => {

    try {
        const {productId} = req.params;
        const {name , category , price , stock, description} = req.body;

        console.log("Product ID : ", productId);
        

        if (category) {
            const existingCategory = await Category.findById(category);
            if (!existingCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
        }
        // now find the product and upate it

        const updatedProduct = await Product.findByIdAndUpdate(productId , {
            name,
            category,
            price,
            stock,
            description
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

module.exports = {addProduct, getAllProduct, updateProduct, deleteProduct, getProductById};