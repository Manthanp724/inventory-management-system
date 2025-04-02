// This is the spare file code which i don't need now just for safe and safety.

// import React, { useState } from "react";
// import { Button } from "@mui/material";
// import { FaFilter, FaCalendarAlt } from "react-icons/fa";
// import Sidebar from "../components/SideBar/SideBar";
// import Header from "../utils/Header";
// import Search from "../utils/Search";
// import { motion, AnimatePresence } from "framer-motion";

// const statusColors = {
//   Pending: "bg-yellow-500 text-white",
//   Processing: "bg-blue-500 text-white",
//   Shipped: "bg-purple-500 text-white",
//   Delivered: "bg-green-500 text-white",
//   Cancelled: "bg-red-500 text-white",
// };

// const Order = () => {
//   const [orders, setOrders] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editOrder, setEditOrder] = useState(null);
//   const [newStatus, setNewStatus] = useState({});
//   const [editingOrderId, setEditingOrderId] = useState(null);

//   const [formData, setFormData] = useState({
//     date: "",
//     customerName: "",
//     customerEmail: "",
//     products: [{ product: "", quantity: "" }],
//     status: "Pending",
//   });

//   const handleAddOrder = (newOrder) => {
//     if (editOrder) {
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === editOrder.id ? { ...editOrder, ...newOrder } : order
//         )
//       );
//     } else {
//       setOrders([...orders, { ...newOrder, id: orders.length + 1 }]);
//     }
//     setShowForm(false);
//     setEditOrder(null);
//     resetForm();
//   };

//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedForm = { ...formData };
//     if (name === "products") {
//       updatedForm.products[index][e.target.dataset.name] = value;
//     } else {
//       updatedForm[name] = value;
//     }
//     setFormData(updatedForm);
//   };

//   const addProduct = () => {
//     setFormData({
//       ...formData,
//       products: [...formData.products, { product: "", quantity: "" }],
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleAddOrder(formData);
//   };

//   const resetForm = () => {
//     setFormData({
//       date: "",
//       customerName: "",
//       customerEmail: "",
//       products: [{ product: "", quantity: "" }],
//       status: "Pending",
//     });
//   };

//   const handleStatusChange = (orderId, status) => {
//     setNewStatus((prev) => ({ ...prev, [orderId]: status }));
//   };

//   const handleUpdateStatus = (orderId) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === orderId
//           ? { ...order, status: newStatus[orderId] || order.status }
//           : order
//       )
//     );
//     setEditingOrderId(null);
//   };

//   return (
//     <div className="flex-1 flex flex-col overflow-hidden p-4">
//       <Header />
//       <div className="mt-8">
//         <div className="flex flex-col lg:flex-row justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
//           <Button
//             className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md mt-4 lg:mt-0"
//             onClick={() => setShowForm(true)}
//           >
//             + New Order
//           </Button>
//         </div>

//         <div className="mt-2 flex flex-col lg:flex-row gap-4 items-center">
//           <Search />
//         </div>

//         {/* Order Table */}
//         <div className="mt-4 bg-white p-4 rounded-lg shadow-lg h-[calc(100vh-200px)] overflow-y-auto">
//           {orders.length === 0 ? (
//             <p className="text-center text-gray-500 text-lg py-6">
//               No orders found.
//             </p>
//           ) : (
//             <table className="w-full border-collapse rounded-xl shadow-xl overflow-hidden bg-white">
//               <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//                 <tr>
//                   <th className="px-6 py-3 text-left font-bold">#</th>
//                   <th className="px-6 py-3 text-left font-bold">Date</th>
//                   <th className="px-6 py-3 text-left font-bold">Customer</th>
//                   <th className="px-6 py-3 text-left font-bold">Products</th>
//                   <th className="px-6 py-3 text-left font-bold">Status</th>
//                   <th className="px-6 py-3 text-center font-bold">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order, index) => (
//                   <tr
//                     key={order.id}
//                     className="border-b hover:bg-gray-100 transition"
//                   >
//                     <td className="px-6 py-4 font-semibold text-gray-700">
//                       {index + 1}
//                     </td>
//                     <td className="px-6 py-4 text-gray-600">{order.date}</td>
//                     <td className="px-6 py-4 text-gray-600">
//                       {order.customerName}
//                     </td>
//                     <td className="px-6 py-4 text-gray-600">
//                       {order.products.map((product, i) => (
//                         <div key={i} className="text-sm">
//                           {product.product}{" "}
//                           <span className="text-gray-400">
//                             (x{product.quantity})
//                           </span>
//                         </div>
//                       ))}
//                     </td>
//                     <td className="px-6 py-4">
//                       {editingOrderId === order.id ? (
//                         <select
//                           value={newStatus[order.id] || order.status}
//                           onChange={(e) =>
//                             handleStatusChange(order.id, e.target.value)
//                           }
//                           className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
//                         >
//                           <option value="Pending">Pending</option>
//                           <option value="Processing">Processing</option>
//                           <option value="Shipped">Shipped</option>
//                           <option value="Delivered">Delivered</option>
//                           <option value="Cancelled">Cancelled</option>
//                         </select>
//                       ) : (
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm font-bold ${
//                             statusColors[order.status]
//                           }`}
//                         >
//                           {order.status}
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       {editingOrderId === order.id ? (
//                         <button
//                           onClick={() => handleUpdateStatus(order.id)}
//                           className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md"
//                         >
//                           Save
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => setEditingOrderId(order.id)}
//                           className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow-md"
//                         >
//                           Update
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {/* Order Form Modal */}
//       <AnimatePresence>
//         {showForm && (
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//             >
//               <button
//                 className="absolute top-3 right-3 text-gray-500"
//                 onClick={() => setShowForm(false)}
//               >
//                 ✖
//               </button>
//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-4">
//                   {editOrder ? "Update Order" : "Add New Order"}
//                 </h2>

//                 {/* Date */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Order Date
//                   </label>
//                   <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
//                     required
//                   />
//                 </div>

//                 {/* Customer Name */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Customer Name
//                   </label>
//                   <input
//                     type="text"
//                     name="customerName"
//                     placeholder="John Doe"
//                     value={formData.customerName}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
//                     required
//                   />
//                 </div>

//                 {/* Customer Email */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Customer Email
//                   </label>
//                   <input
//                     type="email"
//                     name="customerEmail"
//                     placeholder="example@email.com"
//                     value={formData.customerEmail}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
//                     required
//                   />
//                 </div>

//                 {/* Product Section */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-2">
//                     Products
//                   </label>
//                   {formData.products.map((product, index) => (
//                     <div key={index} className="flex gap-3 mb-3">
//                       <input
//                         type="text"
//                         name="products"
//                         data-name="product"
//                         placeholder="Product Name"
//                         value={product.product}
//                         onChange={(e) => handleChange(e, index)}
//                         className="w-2/3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
//                         required
//                       />
//                       <input
//                         type="number"
//                         name="products"
//                         data-name="quantity"
//                         placeholder="Qty"
//                         value={product.quantity}
//                         onChange={(e) => handleChange(e, index)}
//                         className="w-1/3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
//                         required
//                       />
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={addProduct}
//                     className="mt-2 w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition shadow-md"
//                   >
//                     + Add Another Product
//                   </button>
//                 </div>

//                 {/* Status */}
//                 <div>
//                   <label className="block text-gray-600 font-semibold mb-1">
//                     Status
//                   </label>
//                   <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Processing">Processing</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Delivered">Delivered</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg"
//                 >
//                   {editOrder ? "Update Order" : "Create Order"}
//                 </button>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Order;
