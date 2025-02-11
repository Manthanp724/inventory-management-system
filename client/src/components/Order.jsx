import React, { useState } from "react";
import Header from "../utils/Header";
import Button from "@mui/material/Button";
import OrderForm from "../utils/OrderForm";
import Search from "../utils/Search";
import OrderTable from "./OrderTable";


const Order = () => {
  const [showForm, setShowForm] = useState(false);
  const [orders , setOrders] = useState([]);

  return (
    <div>
      {!showForm ? (
        <>
          <Header />
          <div>
            <hr className="h-3 bg-gray-100 w-full border-none" />
          </div>
          <div className="flex justify-between items-center p-4 ml-6 mr-6">
            <h1 className="text-3xl font-semibold">Orders</h1>
            <Button variant="contained" onClick={() => setShowForm(true)}>
              + New Order
            </Button>
          </div>
          <div>
            <hr className="h-1 bg-gray-200 w-full border-none" />
          </div>
          <div className="p-4">
            <Search/>
          </div>
          <div>
            <hr className="h-1 bg-gray-200 w-full border-none" />
          </div>
          <div>
          <OrderTable orders={orders} />
          </div>
          
        </>
      ) : (
        <OrderForm setShowForm={setShowForm} setOrders = {setOrders} />
      )}
    </div>
  );
};

export default Order;
