import React from "react";

const statusColors = {
  Pending: "bg-yellow-500 text-white",
  Processing: "bg-blue-500 text-white",
  Shipped: "bg-purple-500 text-white",
  Delivered: "bg-green-500 text-white",
  Cancelled: "bg-red-500 text-white",
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const OrderTable = ({ orders, isLoading, onEdit, onDelete }) => {
  const orderList = React.useMemo(() => {
    if (Array.isArray(orders)) return orders;
    if (orders && Array.isArray(orders.orders)) return orders.orders;
    if (orders && Array.isArray(orders.data)) return orders.data;
    return [];
  }, [orders]);

  if (isLoading) {
    return (
      <div className="mt-4 bg-white p-4 rounded-lg shadow-lg h-[calc(100vh-200px)] overflow-y-auto">
        <div className="text-center text-gray-500 text-lg py-6">Loading orders...</div>
      </div>
    );
  }

  if (!orderList || orderList.length === 0) {
    return (
      <div className="mt-4 bg-white p-4 rounded-lg shadow-lg h-[calc(100vh-200px)] overflow-y-auto">
        <p className="text-center text-gray-500 text-lg py-6">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-lg h-[calc(100vh-200px)] overflow-y-auto">
      <table className="w-full border-collapse rounded-xl shadow-xl overflow-hidden bg-white">
        <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left font-bold">#</th>
            <th className="px-6 py-3 text-left font-bold">Date</th>
            <th className="px-6 py-3 text-left font-bold">Customer</th>
            <th className="px-6 py-3 text-left font-bold">Products</th>
            <th className="px-6 py-3 text-left font-bold">Total</th>
            <th className="px-6 py-3 text-left font-bold">Status</th>
            <th className="px-6 py-3 text-center font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order, index) => (
            <tr key={order._id || index} className="border-b hover:bg-gray-100 transition">
              <td className="px-6 py-4 font-semibold text-gray-700">{index + 1}</td>
              <td className="px-6 py-4 text-gray-600">
                {formatDate(order.createdAt || order.date)}
              </td>
              <td className="px-6 py-4 text-gray-600">
                <div className="font-medium">{order.customerName || 'N/A'}</div>
                <div className="text-sm text-gray-500">{order.customerEmail || ''}</div>
              </td>
              <td className="px-6 py-4 text-gray-600">
                <div className="space-y-1">
                  {(order.products || []).map((item, i) => (
                    <div key={item._id || i} className="text-sm">
                      <span className="font-medium">
                        {item.product?.name || item.name || 'Unknown Product'}
                      </span>
                      <span className="text-gray-500 ml-2">
                        (x{item.quantity || 1}) - {formatCurrency(item.product?.price || item.price || 0)}
                      </span>
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-gray-700">
                {formatCurrency(order.totalAmount || 0)}
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  statusColors[order.status] || statusColors.Pending
                }`}>
                  {order.status || 'Pending'}
                </span>
              </td>
              <td className="px-6 py-4 text-center space-x-2">
                <button 
                  onClick={() => onEdit(order)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 shadow"
                >
                  Edit Status
                </button>
                <button
                  onClick={() => onDelete(order._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 shadow"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;