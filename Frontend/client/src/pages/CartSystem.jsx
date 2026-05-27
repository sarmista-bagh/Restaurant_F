import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";

const CartSystem = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // 🔥 PRICE CALCULATION (Swiggy style)
  const totalPrice = items.reduce((sum, item) => {
    const info = item.card.info;
    const price = (info.price || info.defaultPrice) / 100;

    return sum + price * item.qty;
  }, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-700">🛒 Cart is Empty</h1>
        <p className="text-gray-500 mt-2">Add delicious food to continue</p>

        <Link
          to="/"
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center mb-10">🛒 Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT - ITEMS */}
          <div className="lg:col-span-2 space-y-5">
            {items.map((item) => {
              const info = item.card.info;
              const price = (info.price || info.defaultPrice) / 100;

              return (
                <div
                  key={info.id}
                  className="bg-white p-5 rounded-2xl shadow flex gap-5"
                >
                  {/* IMAGE */}
                  <img
                    src={
                      info.imageId
                        ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/${info.imageId}`
                        : "https://via.placeholder.com/100"
                    }
                    alt={info.name}
                    className="w-28 h-28 object-cover rounded-xl"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{info.name}</h2>

                    <p className="text-green-600 font-bold mt-1">₹{price}</p>

                    <p className="text-sm text-gray-500 mt-2">
                      {info.isVeg ? "🌱 Veg" : "🍗 Non-Veg"}
                    </p>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center gap-3 mt-4">
                      {/* REMOVE */}
                      <button
                        onClick={() => dispatch(removeItem(info.id))}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg"
                      >
                        -
                      </button>

                      {/* QTY */}
                      <span className="font-semibold">{item.qty}</span>

                      {/* ADD */}
                      <button
                        onClick={() => dispatch(addItem(item))}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg"
                      >
                        +
                      </button>
                    </div>

                    {/* SUBTOTAL */}
                    <p className="mt-3 text-gray-700 font-medium">
                      Subtotal: ₹{price * item.qty}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT - SUMMARY */}
          <div className="bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-20">
            <h2 className="text-2xl font-bold mb-6">🧾 Order Summary</h2>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{items.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹40</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹{totalPrice + 40}</span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => dispatch(clearCart())}
                className="w-full bg-red-500 text-white py-2 rounded-xl"
              >
                Clear Cart
              </button>

              <Link
                to="/checkout"
                className="block text-center w-full bg-green-500 text-white py-3 rounded-xl font-semibold"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSystem;
