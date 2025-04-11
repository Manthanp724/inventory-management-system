const express = require('express')
const cors  = require("cors");
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const ConnectDB = require("./DB/ConnectDB")
const userRoutes = require("./Routes/userRoutes.js")
const productRoute = require("./Routes/productRoute.js")
const categoryRoute = require("./Routes/categoryRoute.js")
const orderRoute = require("./Routes/orderRoute.js")
const salesRoute = require("./Routes/salesRoute.js")

const app = express()
const port = process.env.PORT;
// MongoDB Database connection
ConnectDB(); 

app.use(express.json());
app.use(cors())

// Manual routing
// User Route
app.use('/user/v1', userRoutes)

// Product Route
app.use('/products', productRoute)

// Category routes
app.use('/category', categoryRoute)

// Order Route
app.use(orderRoute);

// sales api
app.use('/sales', salesRoute)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))