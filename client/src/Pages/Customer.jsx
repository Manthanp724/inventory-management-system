import React, { useState, useEffect } from "react";
import { FiUser, FiShoppingBag, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import Header from "../utils/Header";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [showOrdersModal, setShowOrdersModal] = useState(false);

  useEffect(() => {
    const fetchCustomersFromOrders = async () => {
      try {
        // Fetch all orders
        const response = await axios.get("http://localhost:8080/orders");
        const allOrders = response.data.orders;

        // Extract unique customers
        const uniqueCustomersMap = {};
        allOrders.forEach((order) => {
          const key = `${order.customerEmail}-${order.customerName}`;
          if (!uniqueCustomersMap[key]) {
            uniqueCustomersMap[key] = {
              _id: order._id, // Using order ID just for React key purposes
              name: order.customerName,
              email: order.customerEmail,
              orderCount: 1,
            };
          } else {
            uniqueCustomersMap[key].orderCount += 1;
          }
        });

        // Convert to array and sort by name
        const uniqueCustomers = Object.values(uniqueCustomersMap).sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setCustomers(uniqueCustomers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchCustomersFromOrders();
  }, []);

  const fetchCustomerOrders = async (customerEmail) => {
    try {
      // Fetch orders for this specific customer
      const response = await axios.get(
        `http://localhost:8080/sales/customer?email=${encodeURIComponent(
          customerEmail
        )}`
      );
      console.log("RESPNSE FROM SPECIFIC EMAIL CUSTOMER: ", response);

      setCustomerOrders(response.data.data);
      setShowOrdersModal(true);
    } catch (error) {
      console.error("Error fetching customer orders:", error);
    }
  };

  const handleViewOrders = (customer) => {
    setSelectedCustomer(customer);
    fetchCustomerOrders(customer.email);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FiUser className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No customers found
            </h3>
            <p className="text-gray-500">No orders have been placed yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <li key={customer._id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <FiUser className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-4 text-sm text-gray-500">
                        {customer.orderCount}{" "}
                        {customer.orderCount === 1 ? "order" : "orders"}
                      </span>
                      <button
                        onClick={() => handleViewOrders(customer)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Orders
                        <FiChevronRight className="ml-1" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Orders Modal */}
        {showOrdersModal && selectedCustomer && (
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0 bg-gray-500 opacity-75"
                  onClick={() => setShowOrdersModal(false)}
                ></div>
              </div>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Orders for {selectedCustomer.name}
                      </h3>
                      <div className="mt-2">
                        {customerOrders.length === 0 ? (
                          <p className="text-gray-500">
                            No orders found for this customer
                          </p>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {customerOrders.map((order) => (
                                  <tr key={order._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      #{order._id.slice(-6)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {formatDate(order.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                      <div className="space-y-1">
                                        {order.products.map((item, index) => (
                                          <div
                                            key={index}
                                            className="flex justify-between"
                                          >
                                            <span>
                                              {item.product?.name ||
                                                "Product not available"}
                                            </span>
                                            <span className="text-gray-600 ml-2">
                                              (Qty: {item.quantity})
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                          order.status === "Delivered"
                                            ? "bg-green-100 text-green-800"
                                            : order.status === "Cancelled"
                                            ? "bg-red-100 text-red-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}
                                      >
                                        {order.status}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {formatCurrency(order.totalAmount)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowOrdersModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
