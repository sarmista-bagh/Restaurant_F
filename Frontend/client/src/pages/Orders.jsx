import React, { useState } from "react";
import { useSelector } from "react-redux";

const ORDER_STEPS = ["Placed", "Preparing", "On the way", "Delivered"];

const Orders = () => {
  const orders = useSelector((state) => state.orders?.orders || []);
  const [activeOrderId, setActiveOrderId] = useState(null);

  const activeOrder = orders.find((o) => o.id === activeOrderId);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center mb-8">📦 My Orders</h1>

        {/* EMPTY STATE */}
        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <h2 className="text-xl font-semibold">No orders yet</h2>
            <p className="text-gray-500 mt-2">
              Your order history will appear here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 📜 ORDER HISTORY */}
            <div className="bg-white rounded-2xl shadow p-4">
              <h2 className="text-lg font-bold mb-4">📜 Order History</h2>

              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setActiveOrderId(order.id)}
                    className={`p-3 border rounded-xl cursor-pointer transition hover:bg-gray-50 ${
                      activeOrderId === order.id ? "border-green-500" : ""
                    }`}
                  >
                    <p className="font-semibold">
                      Order #{order.id.toString().slice(-5)}
                    </p>

                    <p className="text-sm text-gray-500">₹{order.total}</p>

                    <p className="text-xs text-gray-400">{order.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 🚚 TRACK ORDER */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
              {!activeOrder ? (
                <p className="text-gray-500">Select an order to track 📍</p>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-6">🚚 Track Order</h2>

                  {/* STATUS TRACKER */}
                  <div className="space-y-5">
                    {ORDER_STEPS.map((step, index) => {
                      const currentIndex = ORDER_STEPS.indexOf(
                        activeOrder.status,
                      );

                      const isCompleted = index <= currentIndex;

                      return (
                        <div key={step} className="flex items-center gap-3">
                          {/* DOT */}
                          <div
                            className={`w-4 h-4 rounded-full transition ${
                              isCompleted ? "bg-green-500" : "bg-gray-300"
                            }`}
                          ></div>

                          {/* TEXT */}
                          <span
                            className={`font-medium transition ${
                              activeOrder.status === step
                                ? "text-green-600 font-bold"
                                : "text-gray-500"
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* ORDER DETAILS */}
                  <div className="mt-8 border-t pt-5 space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Delivery Address</p>
                      <p className="font-medium">{activeOrder.address}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium">{activeOrder.payment}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="font-bold text-green-600">
                        ₹{activeOrder.total}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
