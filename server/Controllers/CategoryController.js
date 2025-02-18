const Category = require("../models/CatrgorySchema.js")

const addCategory = async(req , res) =>  {
    try {
        const {name , description} = req.body;

        if(!name){
            return res.status(400).json({message : "Category name is requried"});
        }

        const existingCategory = await Category.findOne({name});

        if(existingCategory){
            return res.status(400).json({message : "Category already exist"})
        }

        const category = await Category.create({name , description});

        return res.status(200).json({message : "New category created successfully" , category});

    } catch (error) {
        return res.status(500).json({message : "Error while creating new category" , error});
    }   
}

const getAllCategory = async(req, res) => {
    try {
        const category = await Category.find();
        return res.status(200).json({messgae : "success", category});
    } catch (error) {
        return res.status(500).json({message : "Error while gettng the category"});
    }
}

const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { name },
            { new: true } // Ensures the updated document is returned
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated successfully", updatedCategory });

    } catch (error) {
        return res.status(500).json({ message: "Error updating category", error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const deleteCategory = await Category.findByIdAndDelete(categoryId);

        if (!deleteCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category Delete successfully", deleteCategory });

    } catch (error) {
        return res.status(500).json({ message: "Error Deleting category", error: error.message });
    }
};



module.exports = {addCategory, getAllCategory , updateCategory, deleteCategory};
