# Inventory Management System

## Overview
The **Inventory Management System** is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). It helps businesses efficiently track their stock by category, view orders, and analyze the most selling products. This system is designed for a single admin user who will manage all inventory operations.

## Features
- **Stock Management**: Add, update, delete, and view products categorized by type.
- **Order Tracking**: Keep track of incoming and outgoing orders.
- **Sales Analytics**: Identify the most sold products with insightful analysis.
- **Real-time Updates**: Ensure inventory data stays updated dynamically.
- **User Authentication**: Secure access for the admin using localStorage for authentication.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **State Management**: React Context API / Redux (optional)
- **Authentication**: LocalStorage-based session management
- **API Communication**: RESTful API with Express.js

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- MongoDB (locally installed or cloud-based like MongoDB Atlas)

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/inventory-management.git
   cd inventory-management
   ```
2. Install dependencies:
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `backend` directory and add the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```
4. Start the backend server:
   ```sh
   cd backend && npm start
   ```
5. Start the frontend application:
   ```sh
   cd frontend && npm start
   ```
6. Open the application in your browser at `http://localhost:3000/`

## API Endpoints
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| GET    | /api/products    | Fetch all products |
| POST   | /api/products    | Add a new product |
| PUT    | /api/products/:id| Update product details |
| DELETE | /api/products/:id| Delete a product |
| GET    | /api/orders      | Fetch all orders |
| POST   | /api/orders      | Create a new order |

## Future Enhancements
- Implement role-based access control (RBAC)
- Generate PDF reports for inventory status
- Integrate barcode scanning for quick product entry
- Implement real-time notifications for low stock alerts
  
