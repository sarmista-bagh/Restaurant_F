import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/admin/orders", {
        withCredentials: true,
      });

      setOrders(res.data);
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/orders/${id}/status`,
        { status },
        { withCredentials: true },
      );

      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status } : order)),
      );
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  // ================= STATUS COLOR =================
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      case "preparing":
        return "bg-purple-100 text-purple-700";
      case "out_for_delivery":
        return "bg-orange-100 text-orange-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📦 Orders Dashboard
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100 hover:-translate-y-1"
          >
            {/* TOP */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-500">
                Order #{order.id}
              </span>

              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* DETAILS */}
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold">User ID:</span> {order.user_id}
              </p>

              <p>
                <span className="font-semibold">Restaurant ID:</span>{" "}
                {order.restaurant_id}
              </p>

              <p>
                <span className="font-semibold">Amount:</span>{" "}
                <span className="text-green-600 font-bold">
                  ₹{order.total_amount}
                </span>
              </p>

              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(order.created_).toLocaleString()}
              </p>
            </div>

            {/* ACTION */}
            <div className="mt-4">
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
