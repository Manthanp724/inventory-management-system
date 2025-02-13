import React, { useState } from "react";

const OrderTable = ({ orders = [] }) => {
  const [showOrder, setshowOrder] = useState(null);

  if (!orders.length) {
    return (
      <p className="text-center text-gray-500 text-lg py-6">No orders found.</p>
    );
  }

  const handleViewDescription = (order) => {
    const description = order.description;
    setshowOrder(description);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="w-full border-collapse bg-white">
        <thead className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600">
          <tr>
            <th className="px-6 py-4 text-left text-md font-semibold text-white uppercase tracking-wider">
              Order Id
            </th>
            <th className="px-6 py-4 text-left text-md font-semibold text-white uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-4 text-left text-md font-semibold text-white uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-4 text-left text-md font-semibold text-white uppercase tracking-wider">
              Item Name
            </th>
            <th className="px-6 py-4 text-left text-md font-semibold text-white uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-4 text-left text-md font-semibold text-white uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-md font-semibold text-white uppercase tracking-wider">
              Discription
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-all duration-200"
            >
              <td className="px-7 py-4 whitespace-nowrap text-md text-gray-700">
                1
              </td>
              <td className="px-7 py-4 whitespace-nowrap text-md text-gray-700">
                {order.date}
              </td>
              <td className="px-7 py-4 whitespace-nowrap text-md text-gray-700">
                {order.customer}
              </td>
              <td className="px-7 py-4 whitespace-nowrap text-md text-gray-700">
                {order.itemName}
              </td>
              <td className="px-7 py-4 whitespace-nowrap text-md text-gray-700">
                {order.quantity}
              </td>
              <td className="px-7 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-md font-semibold ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "Process"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-7 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleViewDescription(order)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded transition-colors duration-200"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showOrder && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Order Description
            </h1>
            <h2 className="text-md text-gray-600 mb-6">
              <h1 className="text-2xl"><strong className="text-gray-800">Description:</strong>{" "}</h1>
              {showOrder || "No description available."}
            </h2>
            <button
              onClick={() => setshowOrder(null)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
