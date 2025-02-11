const OrderTable = ({ orders = [] }) => {
    if (!orders.length) {
      return <p className="text-center text-gray-500">No orders found.</p>;
    }
  
    return (
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Customer</th>
            <th className="border border-gray-300 px-4 py-2">Item Name</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 text-center">{order.date}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{order.customer}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{order.itemName}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{order.quantity}</td>
              <td className="border border-gray-300 px-4 py-2 text-center text-lg"> <span className=" bg-green-400 p-2 rounded-2xl">{order.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default OrderTable;
  