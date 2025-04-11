import React from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { generateReceiptHTML } from "./receiptHtml";

const statusColors = {
  Pending: "bg-amber-100 text-amber-800 border-amber-300",
  Processing: "bg-blue-100 text-blue-800 border-blue-300",
  Shipped: "bg-indigo-100 text-indigo-800 border-indigo-300",
  Delivered: "bg-emerald-100 text-emerald-800 border-emerald-300",
  Cancelled: "bg-rose-100 text-rose-800 border-rose-300",
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatCurrency = (amount) => {
  if (typeof amount !== "number") return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const OrderTable = ({
  orders,
  isLoading,
  onEdit,
  onDelete,
  sortConfig,
  requestSort,
}) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <FiArrowUp className="ml-1" />
    ) : (
      <FiArrowDown className="ml-1" />
    );
  };

  const handlePrintReceipt = (order) => {
    const printWindow = window.open('', '_blank');
    const receiptHTML = generateReceiptHTML(order, formatDate, formatCurrency);
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
  };


  if (isLoading) {
    return (
      <div className="mt-4 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <div className="text-gray-600">Loading orders...</div>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="mt-4 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No orders found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("_id")}
              >
                <div className="flex items-center">
                  Order ID
                  {getSortIcon("_id")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("createdAt")}
              >
                <div className="flex items-center">
                  Date
                  {getSortIcon("createdAt")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Products
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("totalAmount")}
              >
                <div className="flex items-center">
                  Total
                  {getSortIcon("totalAmount")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    #{order._id.slice(-6)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.customerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.customerEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs">
                    {(order.products || []).slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                      <span className="font-medium text-gray-800">
                        {item.product?.name || item.name}
                      </span>
                      <div className="flex items-center">
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full">
                          ×{item.quantity}
                        </span>
                        {item.price && (
                          <span className="ml-2 text-sm font-medium text-gray-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    ))}
                    {order.products?.length > 2 && (
                      <div className="text-sm text-indigo-600 mt-1">
                        +{order.products.length - 2} more items
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(order.totalAmount || 0)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-sm font-medium border ${
                      statusColors[order.status] || statusColors.Pending
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex gap-2">
                    {order.status === 'Delivered' ? (
                      // Receipt Button for delivered orders
                      <button
                        onClick={() => handlePrintReceipt(order)}
                        className="
                          px-3 py-1.5
                          text-emerald-600 hover:text-white
                          bg-white hover:bg-emerald-600
                          border border-emerald-300 hover:border-emerald-600
                          rounded-md
                          text-sm font-medium
                          transition-colors duration-200
                          focus:outline-none focus:ring-1 focus:ring-emerald-500
                          flex items-center
                        "
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Receipt
                      </button>
                    ) : (
                      // Edit and Delete buttons for non-delivered orders
                      <>
                        <button
                          onClick={() => onEdit(order)}
                          className="
                            px-3 py-1.5
                            text-indigo-600 hover:text-white
                            bg-white hover:bg-indigo-600
                            border border-indigo-300 hover:border-indigo-600
                            rounded-md
                            text-sm font-medium
                            transition-colors duration-200
                            focus:outline-none focus:ring-1 focus:ring-indigo-500
                          "
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(order._id)}
                          className="
                            px-3 py-1.5
                            text-rose-600 hover:text-white
                            bg-white hover:bg-rose-600
                            border border-rose-300 hover:border-rose-600
                            rounded-md
                            text-sm font-medium
                            transition-colors duration-200
                            focus:outline-none focus:ring-1 focus:ring-rose-500
                          "
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;