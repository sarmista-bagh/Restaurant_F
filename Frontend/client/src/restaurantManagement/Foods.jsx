import { useEffect, useState } from "react";
import axios from "axios";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    restaurant_id: "",
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  // ================= FETCH FOODS =================
  const fetchFoods = async () => {
    if (!restaurantId) return;

    try {
      const res = await axios.get(
        //`http://localhost:5000/api/admin/foods/${restaurantId}`,

        `https://menu-gdbm.onrender.com/api/admin/foods/${restaurantId}`,

        { withCredentials: true },
      );

      setFoods(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [restaurantId]);

  // ================= CREATE / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.restaurant_id) return alert("Restaurant ID required");
    if (!form.name.trim()) return alert("Food name required");
    if (!form.price) return alert("Price required");

    try {
      setLoading(true);

      const payload = {
        restaurant_id: Number(form.restaurant_id),
        name: form.name,
        price: Number(form.price),
        image: form.image,
        category: form.category,
        description: form.description,
      };

      // ================= UPDATE =================
      if (editId) {
        await axios.put(
          // `http://localhost:5000/api/admin/foods/${editId}`,

          `https://menu-gdbm.onrender.com/api/admin/foods/${editId}`,

          payload,
          { withCredentials: true },
        );

        alert("Food updated ✅");
      }
      // ================= CREATE =================
      else {
        await axios.post(
          //"http://localhost:5000/api/admin/foods",

          "https://menu-gdbm.onrender.com/api/admin/foods",
          payload,
          {
            withCredentials: true,
          },
        );

        alert("Food created ✅");
      }

      resetForm();
      fetchFoods();
    } catch (err) {
      console.log(err);
      alert("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (food) => {
    setEditId(food.id);

    setForm({
      restaurant_id: food.restaurant_id,
      name: food.name,
      price: food.price,
      image: food.image,
      category: food.category,
      description: food.description,
    });
  };

  // ================= DELETE =================
  const deleteFood = async (id) => {
    try {
      await axios.delete(
        //`http://localhost:5000/api/admin/foods/${id}`,

        `https://menu-gdbm.onrender.com/api/admin/foods/${id}`,

        {
          withCredentials: true,
        },
      );

      setFoods(foods.filter((f) => f.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // ================= RESET =================
  const resetForm = () => {
    setForm({
      restaurant_id: "",
      name: "",
      price: "",
      image: "",
      category: "",
      description: "",
    });

    setEditId(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">🍔 Foods Management</h1>

      {/* FILTER */}
      <input
        placeholder="Enter Restaurant ID"
        className="border p-2 rounded mb-4 w-full"
        value={restaurantId}
        onChange={(e) => setRestaurantId(e.target.value)}
      />

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow grid md:grid-cols-2 gap-3"
      >
        <input
          placeholder="Restaurant ID"
          value={form.restaurant_id}
          onChange={(e) => setForm({ ...form, restaurant_id: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Food Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />

        {/* BUTTON */}
        <button
          disabled={loading}
          className={`md:col-span-2 text-white p-2 rounded ${
            editId ? "bg-blue-500" : "bg-orange-500"
          }`}
        >
          {loading ? "Processing..." : editId ? "Update Food" : "Add Food"}
        </button>
      </form>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {foods.map((f) => (
          <div key={f.id} className="bg-white p-4 rounded-xl shadow">
            <img
              src={f.image || "https://via.placeholder.com/150"}
              className="w-full h-32 object-cover rounded"
            />

            <h3 className="font-bold mt-2">
              #{f.id} - {f.name}
            </h3>

            <p className="text-gray-500">₹{f.price}</p>
            <p className="text-sm text-gray-400">{f.category}</p>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(f)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteFood(f.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Foods;
