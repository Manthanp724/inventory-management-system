const Order = require("../models/OrderSchema.js")
const Product =  require("../models/ProductSchema.js")
const mongoose = require('mongoose');

// const createOrder = async(req , res) => {
//     try {

//         const { products, customerName, customerEmail , date, status = "Pending" } = req.body;

//         if(!products || products.length === 0){
//             return res.status(400).json({message : "Order must contain atleast one Item"});
//         }

//         const orderDate = date ? new Date(date) : new Date();

//         let totalAmount = 0;
//         const productUpdates = [];

//         for(let item of products){
//             // picked item one by one from product schema
//             const product = await Product.findById(item.product);   
//             console.log("Product : ", product);
            
//             if(!product){
//                 return res.status(404).json({message : `Product with ID${item.product} is not exist`})
//             }

//             if(product.stock < item.quantity){
//                 return res.status(400).json({message : `Not enough stcok for ${product.name}`});
//             }
//             // we got total price from here. now we have to minus the quantity of order from existing stock.
//             totalAmount += product.price * item.quantity;
//             productUpdates.push({
//                 updateOne: {
//                     filter: { _id: product._id },
//                     update: { $inc: { stock: -item.quantity } }
//                 }
//             });

//             // product.stock -= item.quantity;

            
//             // And now save current product stcok 
//             //await product.save();

//            // Perform bulk write to update stock for all products at once
//             if (productUpdates.length > 0) {
//                 await Product.bulkWrite(productUpdates);
//             }
//         }

//         const order = await Order.create({products, totalAmount, customerName, customerEmail, date : orderDate, status });

//         res.status(201).json({
//             message: "Success: Order created successfully",
//             order: {
//               ...order.toObject(),
//               date: order.date, // Ensure date is included in the response
//             }
//           });

        
//     } catch (error) {
//         res.status(501).json({message : "Error" , error});

//     }
// }

const createOrder = async (req, res) => {
    try {
      const { customerName, customerEmail, products } = req.body;
  
      // Validate required fields
      if (!customerName || !customerEmail) {
        return res.status(400).json({ message: "Customer name and email are required" });
      }
  
      if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "At least one product is required" });
      }
  
      let totalAmount = 0;
      const productUpdates = [];
      const productList = [];
  
      for (const item of products) {
        let product;
        
        // Check if product is an ID (24-character hex string)
        if (/^[0-9a-fA-F]{24}$/.test(item.product)) {
          product = await Product.findById(item.product);
        } 
        // Otherwise treat as name
        else {
          product = await Product.findOne({ name: item.product });
        }
  
        if (!product) {
          return res.status(404).json({ message: `Product not found: ${item.product}` });
        }
  
        if (product.stock < item.quantity) {
          return res.status(400).json({ 
            message: `Insufficient stock for ${product.name} (Available: ${product.stock}, Requested: ${item.quantity})`
          });
        }
  
        // Calculate order total
        totalAmount += product.price * item.quantity;
        
        // Prepare product list for order
        productList.push({
          product: product._id,
          quantity: item.quantity,
          productName: product.name, // Store name for reference
          priceAtPurchase: product.price // Capture price at time of order
        });
        
        // Prepare stock updates
        productUpdates.push({
          updateOne: {
            filter: { _id: product._id },
            update: { $inc: { stock: -item.quantity } }
          }
        });
      }
  
      // Create order
      const order = await Order.create({
        customerName,
        customerEmail,
        products: productList,
        totalAmount,
        status: "Pending",
        date: new Date()
      });
  
      // Update stock levels
      await Product.bulkWrite(productUpdates);
  
      // Return populated order
      const populatedOrder = await Order.findById(order._id)
        .populate("products.product", "name price category");
  
      res.status(201).json({
        success: true,
        message: "Order created successfully",
        order: populatedOrder
      });
  
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create order", 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  };



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