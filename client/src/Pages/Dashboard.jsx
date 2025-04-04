import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Header from '../utils/Header';

const Dashboard = () => {
  // ✅ Dummy data
  const totalSales = { totalRevenue: 150000, totalOrders: 75 };
  const monthlySales = [
    { _id: { month: 1, year: 2024 }, totalRevenue: 25000, totalOrders: 10 },
    { _id: { month: 2, year: 2024 }, totalRevenue: 35000, totalOrders: 15 },
    { _id: { month: 3, year: 2024 }, totalRevenue: 45000, totalOrders: 20 },
  ];
  const dailySales = [
    { _id: { day: 1, month: 3, year: 2024 }, totalRevenue: 5000, totalOrders: 2 },
    { _id: { day: 2, month: 3, year: 2024 }, totalRevenue: 7000, totalOrders: 3 },
    { _id: { day: 3, month: 3, year: 2024 }, totalRevenue: 10000, totalOrders: 5 },
  ];

  // ✅ Formatted data for charts
  const monthlyChartData = monthlySales.map((item) => ({
    name: `M${item._id.month}/${item._id.year}`,
    revenue: item.totalRevenue,
    orders: item.totalOrders,
  }));

  const dailyChartData = dailySales.map((item) => ({
    name: `D${item._id.day}/${item._id.month}`,
    revenue: item.totalRevenue,
    orders: item.totalOrders,
  }));

  return (
    <div className="bg-gray-100 min-h-screen">
        <Header/>
        <div className='p-6'>
        <h1 className="text-3xl font-bold mb-6 mt-4">📊 Dashboard</h1>

{/* Total Sales Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <div className="p-6 bg-white rounded-2xl shadow">
    <h3 className="font-semibold text-gray-500">💰 Total Revenue</h3>
    <p className="text-3xl font-bold mt-2">₹ {totalSales.totalRevenue}</p>
  </div>
  <div className="p-6 bg-white rounded-2xl shadow">
    <h3 className="font-semibold text-gray-500">📦 Total Orders</h3>
    <p className="text-3xl font-bold mt-2">{totalSales.totalOrders}</p>
  </div>
</div>

{/* Monthly Sales Bar Chart */}
<div className="bg-white rounded-2xl shadow p-6 mb-8">
  <h3 className="font-semibold text-lg mb-4">📊 Monthly Revenue Chart</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={monthlyChartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="revenue" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
</div>

{/* Daily Sales Line Chart */}
<div className="bg-white rounded-2xl shadow p-6 mb-8">
  <h3 className="font-semibold text-lg mb-4">📈 Daily Orders Chart</h3>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={dailyChartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={3} />
    </LineChart>
  </ResponsiveContainer>
</div>

{/* Monthly Sales Table */}
<div className="p-6 bg-white rounded-2xl shadow mb-8">
  <h3 className="font-semibold text-lg mb-4">📅 Monthly Sales</h3>
  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="bg-gray-200">
        <th className="border p-3">Month</th>
        <th className="border p-3">Year</th>
        <th className="border p-3">Revenue</th>
        <th className="border p-3">Orders</th>
      </tr>
    </thead>
    <tbody>
      {monthlySales.map((item, index) => (
        <tr key={index} className="hover:bg-gray-100">
          <td className="border p-3">{item._id.month}</td>
          <td className="border p-3">{item._id.year}</td>
          <td className="border p-3">₹ {item.totalRevenue}</td>
          <td className="border p-3">{item.totalOrders}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Daily Sales Table */}
<div className="p-6 bg-white rounded-2xl shadow mb-8">
  <h3 className="font-semibold text-lg mb-4">📆 Daily Sales</h3>
  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="bg-gray-200">
        <th className="border p-3">Day</th>
        <th className="border p-3">Month</th>
        <th className="border p-3">Year</th>
        <th className="border p-3">Revenue</th>
        <th className="border p-3">Orders</th>
      </tr>
    </thead>
    <tbody>
      {dailySales.map((item, index) => (
        <tr key={index} className="hover:bg-gray-100">
          <td className="border p-3">{item._id.day}</td>
          <td className="border p-3">{item._id.month}</td>
          <td className="border p-3">{item._id.year}</td>
          <td className="border p-3">₹ {item.totalRevenue}</td>
          <td className="border p-3">{item.totalOrders}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        </div>
    </div>
  );
};

export default Dashboard;
