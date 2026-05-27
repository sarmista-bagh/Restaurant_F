import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";

const Checkout = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // ✅ SAFE PRICE CALCULATION (fix NaN issue)
  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => {
      const price =
        item?.card?.info?.price || item?.card?.info?.defaultPrice || 0;

      return sum + price / 100;
    }, 0);
  }, [items]);

  const deliveryFee = 40;
  const finalTotal = totalPrice + deliveryFee;

  const handlePlaceOrder = () => {
    if (!address || !payment) {
      alert("⚠️ Please fill Delivery Address and Payment Method");
      return;
    }

    if (payment === "Online" && !accountNumber) {
      alert("⚠️ Please enter account number");
      return;
    }

    setOrderPlaced(true);
    dispatch(clearCart());
  };

  // 🎉 SUCCESS SCREEN
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full">
          <div className="text-6xl">🎉</div>

          <h2 className="text-2xl font-bold text-green-600 mt-4">
            Order Placed Successfully
          </h2>

          <p className="text-gray-500 mt-2">Your food is being prepared 🍽️</p>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gray-200 px-5 py-2 rounded-xl font-semibold"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => (window.location.href = "/orders")}
              className="bg-green-500 text-white px-5 py-2 rounded-xl font-semibold"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center mb-8">🧾 Checkout</h1>

        {/* EMPTY CART */}
        {items.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-3xl shadow">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">Add items to continue checkout</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
              {/* 📍 ADDRESS */}
              <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-lg font-bold mb-4">📍 Delivery Address</h2>

                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter full delivery address..."
                  className="w-full border p-3 rounded-xl h-28 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* 💳 PAYMENT */}
              <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-lg font-bold mb-4">
                  💳 Payment Method Selection
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      onChange={(e) => setPayment(e.target.value)}
                    />
                    Cash on Delivery
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="Online"
                      onChange={(e) => setPayment(e.target.value)}
                    />
                    Online Payment
                  </label>
                </div>

                {payment === "Online" && (
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                    className="mt-4 w-full border p-3 rounded-xl"
                  />
                )}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="bg-white p-6 rounded-2xl shadow h-fit sticky top-20">
              <h2 className="text-xl font-bold mb-5">🧾 Order Summary</h2>

              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{items.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>

                <hr />

                <div className="flex justify-between font-bold text-black text-lg">
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* PLACE ORDER BUTTON */}
              <button
                onClick={handlePlaceOrder}
                className="w-full mt-6 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
