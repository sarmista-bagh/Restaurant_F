import { useEffect, useState } from "react";
import axios from "axios";

const OrderItems = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrderItems = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        // "http://localhost:5000/api/admin/order-items",

        "https://menu-gdbm.onrender.com/api/admin/order-items",

        { withCredentials: true },
      );

      setOrderItems(res.data);
    } catch (err) {
      console.error("Error fetching order items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderItems();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading order items...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🍽 Order Items Dashboard
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {orderItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100 hover:-translate-y-1"
          >
            {/* TOP BADGE */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-500">
                Item ID #{item.id}
              </span>

              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                Order #{item.order_id}
              </span>
            </div>

            {/* FOOD ID */}
            <div className="mb-3">
              <p className="text-sm text-gray-500">Food ID</p>
              <p className="text-lg font-bold text-gray-800">{item.food_id}</p>
            </div>

            {/* QTY + PRICE */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">Quantity</p>
                <p className="font-bold text-green-600">{item.quantity}</p>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">Price</p>
                <p className="font-bold text-orange-600">₹{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
