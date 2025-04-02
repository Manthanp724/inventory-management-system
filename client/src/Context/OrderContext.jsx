import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Corrected name
const OrderContext = createContext();

// Custom Hook
export const useOrderContext = () => {
  return useContext(OrderContext);
};

export const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all orders
  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/orders");
      console.log("Response from fetchAllOrders:", response);
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error while fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get Order by ID
  // const fetchOrderById = async (id) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`http://localhost:8080/orders/${id}`);
  //     console.log("Order fetched by ID:", response);
  //     return response.data.order;
  //   } catch (error) {
  //     console.error(`Error fetching order by ID: ${id}`, error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Create a new order
  const createOrder = async (orderData) => {
    try {
      const response = await axios.post("http://localhost:8080/orders", orderData);
      console.log(response);
      setOrders((prevOrders) => [...prevOrders, response.data.order]);

    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Update order by ID
  const updateOrder = async (id, newStatus) => {
    try {
      const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
      if (!validStatuses.includes(newStatus)) {
        console.error("Invalid Order Status");
        return;
      }

      const response = await axios.put(`http://localhost:8080/orders/${id}`, {
        status: newStatus,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: response.data.order.status } : order
        )
      );
    } catch (error) {
      console.error(`Error updating order with ID ${id}`, error);
    }
  };

  // Delete order by ID
  // const deleteOrder = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:8080/orders/${id}`);
  //     setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
  //   } catch (error) {
  //     console.error(`Error deleting order with ID ${id}`, error);
  //   }
  // };

  // Fetch orders on mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ orders, loading, createOrder, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
