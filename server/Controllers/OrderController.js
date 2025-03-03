const Order = require("../models/OrderSchema.js")
const Product =  require("../models/ProductSchema.js")

const createOrder = async(req , res) => {
    try {

        const { products, customerName, customerEmail } = req.body;

        if(!products || products.length === 0){
            return res.status(400).json({message : "Order must contain atleast one Item"});
        }

        let totalAmount = 0;

        for(let item of products){
            // picked item one by one from product schema
            const product = await Product.findById(item.product);   
            console.log("Product : ", product);
            
            if(!product){
                return res.status(404).json({message : `Product with ID${item.product} is not exist`})
            }

            if(product.stock < item.quantity){
                return res.status(400).json({message : `Not enough stcok for ${product.name}`});
            }
            // we got total price from here. now we have to minus the quantity of order from existing stock.
            totalAmount += product.price * item.quantity;

            product.stock -= item.quantity;

            // And now save current product stcok 
            await product.save();
        }

        const order = await Order.create({products, totalAmount, customerName, customerEmail });

        return res.status(200).json({message : "Success", order});

        
    } catch (error) {
        res.status(501).json({message : "Error" , error});

    }
}

const getAllOrders = async (req, res) => {
    try {
        const { customerEmail, sort, startDate, endDate } = req.query;
        let filter = {};

        if (customerEmail) {
            filter.customerEmail = { $regex: customerEmail, $options: "i" };
        }

        if (startDate && endDate) {
            filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        let query = Order.find(filter).populate("products.product", "name price");

        if (sort) {
            const sortOptions = { date: "createdAt", amount: "totalAmount" };
            query = query.sort({ [sortOptions[sort]]: -1 });
        } else {
            query = query.sort({ createdAt: -1 }); 
        }

        const orders = await query;

        res.status(200).json({ message: "Success: All orders retrieved successfully", orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};


const getOrderByID = async(req , res) =>  {
    try {
        const {id} = req.params;

        const order = await Order.findById(id).populate("products.product", "name price");
        
        return res.status(200).json({message : "Success", order});
    } catch (error) {
        res.status(501).json({message : "Error", error})
    }
}

const updateOrder = async(req, res) => {
    try {

        const{id} = req.params;
        const {status} = req.body;

        switch (status) {
            case "Pending":
            case "Processing":
            case "Shipped":
            case "Delivered":
            case "Cancelled":
                break; // Valid status
            default:
                return res.status(400).json({ message: "Invalid order status" });
        }

        const order = await Order.findByIdAndUpdate(id , {status}, {new : true});

        if(!order){
            return res.status(404).json({message : "Order not found"});
        }

        return res.status(200).json({message : "Order Updated Successfully", order})
        
    } catch (error) {
        res.status(500).json({message : "error", error});
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ message: "Order deleted successfully", order });

    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error: error.message });
    }
};

module.exports = {createOrder, getAllOrders, getOrderByID, updateOrder, deleteOrder};