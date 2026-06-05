// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// import Shimmer from "./Shimmer";
// import { addItem } from "../utils/cartSlice";

// const RestaurantDetails = () => {
//   const { resId } = useParams();

//   const [menuData, setMenuData] = useState(null);
//   const [openCategory, setOpenCategory] = useState(null);

//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   // Redux cart
//   const cartItems = useSelector((store) => store.cart.items);

//   useEffect(() => {
//     fetchMenu();
//   }, [resId]);

//   // Fetch Menu using Axios
//   const fetchMenu = async () => {
//     try {
//       const response = await axios.get(
//         `https://menu-gdbm.onrender.com/api/menu/${resId}`,
//       );

//       const json = response.data;

//       // Restaurant Info
//       const restaurantInfo = json?.data?.cards?.find(
//         (c) => c.card?.card?.info?.name,
//       )?.card?.card?.info;

//       // Categories
//       const categories =
//         json?.data?.cards
//           ?.find((c) => c.groupedCard)
//           ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
//             (c) => c.card?.card?.title,
//           )
//           ?.map((c) => c.card.card) || [];

//       setMenuData({
//         restaurantInfo,
//         categories,
//       });
//     } catch (err) {
//       console.error("Axios Menu Fetch Error:", err);
//     }
//   };

//   // Add Item
//   const handleAddItem = (item) => {
//     dispatch(addItem(item));
//   };

//   if (!menuData) return <Shimmer />;

//   const { restaurantInfo, categories } = menuData;

//   return (
//     <div className="min-h-screen bg-gray-100 pb-28">
//       {/* Header */}
//       <div className="bg-white shadow-md rounded-b-3xl p-6 sticky top-0 z-10">
//         <h1 className="text-3xl font-bold text-gray-800">
//           {restaurantInfo?.name}
//         </h1>

//         <p className="text-gray-500 mt-2">
//           {restaurantInfo?.cuisines?.join(", ")}
//         </p>

//         <div className="flex gap-4 mt-4">
//           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//             ⭐ {restaurantInfo?.avgRating}
//           </span>

//           <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
//             💰 {restaurantInfo?.costForTwoMessage}
//           </span>
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="max-w-5xl mx-auto px-4 mt-6">
//         {categories.map((cat, idx) => (
//           <div
//             key={idx}
//             className="bg-white rounded-2xl shadow-md mb-5 overflow-hidden"
//           >
//             {/* Accordion Header */}
//             <div
//               className="flex justify-between items-center px-6 py-5 cursor-pointer hover:bg-gray-50 transition"
//               onClick={() => setOpenCategory(openCategory === idx ? null : idx)}
//             >
//               <h2 className="text-lg font-semibold text-gray-800">
//                 {cat.title}
//               </h2>

//               <span className="text-xl">
//                 {openCategory === idx ? "▲" : "▼"}
//               </span>
//             </div>

//             {/* Items */}
//             {openCategory === idx && (
//               <div className="border-t border-gray-200">
//                 {cat.itemCards?.map((item) => {
//                   const info = item.card.info;

//                   const price = (info.price || info.defaultPrice) / 100;

//                   return (
//                     <div
//                       key={info.id}
//                       className="flex flex-col md:flex-row gap-5 p-5 border-b border-gray-100 hover:bg-gray-50 transition"
//                     >
//                       {/* Image */}
//                       <img
//                         src={
//                           info.imageId
//                             ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/${info.imageId}`
//                             : "https://via.placeholder.com/150"
//                         }
//                         alt={info.name}
//                         className="w-full md:w-40 h-40 object-cover rounded-xl"
//                       />

//                       {/* Details */}
//                       <div className="flex-1 flex flex-col justify-between">
//                         <div>
//                           <h3 className="text-xl font-bold text-gray-800">
//                             {info.name}
//                           </h3>

//                           <p className="text-green-600 font-semibold mt-2">
//                             ₹{price}
//                           </p>

//                           <p className="text-gray-500 text-sm mt-2">
//                             {info.description}
//                           </p>

//                           <p className="mt-3">
//                             {info.isVeg ? "🌱 Veg" : "🍗 Non-Veg"}
//                           </p>
//                         </div>

//                         {/* Button */}
//                         <button
//                           className="mt-4 w-fit bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold transition"
//                           onClick={() => handleAddItem(item)}
//                         >
//                           ADD +
//                         </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Sticky Cart */}
//       {cartItems.length > 0 && (
//         <div className="fixed bottom-0 left-0 right-0 bg-black text-white px-6 py-4 flex justify-between items-center shadow-2xl">
//           <div>
//             <p className="font-semibold">{cartItems.length} items added</p>

//             <p className="text-sm text-gray-300">
//               ₹
//               {cartItems.reduce((sum, item) => {
//                 const info = item.card.info;

//                 return sum + (info.price || info.defaultPrice) / 100;
//               }, 0)}
//             </p>
//           </div>

//           {/* BUTTON */}
//           <button
//             onClick={() => navigate("/cart")}
//             className="bg-[#60B246] hover:bg-[#58a93f] active:scale-95 transition px-5 sm:px-6 py-2 rounded-md font-semibold"
//           >
//             VIEW CART →
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RestaurantDetails;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Shimmer from "./Shimmer";
import { addItem } from "../utils/cartSlice";

const RestaurantDetails = () => {
  const { resId } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((store) => store.cart.items);

  useEffect(() => {
    fetchRestaurantMenu();
  }, [resId]);

  const fetchRestaurantMenu = async () => {
    try {
      const response = await axios.get(
        `https://menu-gdbm.onrender.com/api/menu/${resId}`,
      );

      console.log("MENU API:", response.data);

      setRestaurant(response.data.restaurant);
      setMenuItems(response.data.items);
    } catch (error) {
      console.error("Menu Fetch Error:", error);
    }
  };

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  if (!restaurant) {
    return <Shimmer />;
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-28">
      {/* Header */}
      <div className="bg-white shadow-md rounded-b-3xl p-6">
        <h1 className="text-3xl font-bold">{restaurant.name}</h1>

        <p className="text-gray-500 mt-2">{restaurant.address}</p>

        <div className="flex gap-4 mt-4">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            ⭐ {restaurant.rating}
          </span>

          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            ⏱ {restaurant.delivery_time} mins
          </span>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        {menuItems.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            No menu items available
          </div>
        ) : (
          menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md mb-5 p-5"
            >
              <h2 className="text-xl font-bold">{item.name}</h2>

              <p className="text-green-600 font-semibold mt-2">₹{item.price}</p>

              <p className="text-gray-500 mt-2">{item.description}</p>

              <button
                onClick={() => handleAddItem(item)}
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded-xl"
              >
                ADD +
              </button>
            </div>
          ))
        )}
      </div>

      {/* Sticky Cart */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white px-6 py-4 flex justify-between items-center">
          <div>
            <p>{cartItems.length} items added</p>

            <p>
              ₹{cartItems.reduce((sum, item) => sum + Number(item.price), 0)}
            </p>
          </div>

          <button
            onClick={() => navigate("/cart")}
            className="bg-[#60B246] px-6 py-2 rounded-md"
          >
            VIEW CART →
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
