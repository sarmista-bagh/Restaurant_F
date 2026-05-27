// import { useEffect, useState } from "react";
// import axios from "axios";

// const RestaurantDashboard = () => {
//   const [menu, setMenu] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     image: "",
//   });

//   const restaurant_id = localStorage.getItem("restaurant_id");

//   /* ================= FETCH MENU ================= */
//   const fetchMenu = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/menu/${restaurant_id}`,
//         { withCredentials: true },
//       );
//       setMenu(res.data.data || res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchMenu();
//   }, []);

//   /* ================= ADD FOOD ================= */
//   const addFood = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/menu",
//         {
//           restaurant_id,
//           ...form,
//         },
//         { withCredentials: true },
//       );

//       setForm({
//         name: "",
//         description: "",
//         price: "",
//         category: "",
//         image: "",
//       });
//       fetchMenu();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   /* ================= DELETE FOOD ================= */
//   const deleteFood = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/menu/${id}`, {
//         withCredentials: true,
//       });
//       fetchMenu();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6">🍔 Restaurant Dashboard</h1>

//       {/* ================= ADD FORM ================= */}
//       <div className="bg-white p-4 rounded-xl shadow-md grid grid-cols-2 gap-3">
//         <input
//           className="border p-2 rounded"
//           placeholder="Food Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           className="border p-2 rounded"
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//         />

//         <input
//           className="border p-2 rounded"
//           placeholder="Category"
//           value={form.category}
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//         />

//         <input
//           className="border p-2 rounded"
//           placeholder="Image URL"
//           value={form.image}
//           onChange={(e) => setForm({ ...form, image: e.target.value })}
//         />

//         <textarea
//           className="border p-2 rounded col-span-2"
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <button
//           onClick={addFood}
//           className="bg-green-600 text-white py-2 rounded col-span-2 hover:bg-green-700"
//         >
//           ➕ Add Food
//         </button>
//       </div>

//       {/* ================= MENU LIST ================= */}
//       <div className="grid md:grid-cols-3 gap-4 mt-6">
//         {menu.map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-xl shadow-md overflow-hidden"
//           >
//             <img
//               src={item.image || "https://via.placeholder.com/300"}
//               className="h-40 w-full object-cover"
//             />

//             <div className="p-3">
//               <h2 className="text-lg font-bold">{item.name}</h2>
//               <p className="text-gray-500 text-sm">{item.description}</p>

//               <div className="flex justify-between items-center mt-2">
//                 <span className="font-bold text-green-600">₹{item.price}</span>

//                 <span className="text-xs bg-gray-200 px-2 py-1 rounded">
//                   {item.category}
//                 </span>
//               </div>

//               <div className="flex gap-2 mt-3">
//                 <button
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                   onClick={() => deleteFood(item.id)}
//                 >
//                   Delete
//                 </button>

//                 <button className="bg-blue-500 text-white px-3 py-1 rounded">
//                   Edit
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RestaurantDashboard;
