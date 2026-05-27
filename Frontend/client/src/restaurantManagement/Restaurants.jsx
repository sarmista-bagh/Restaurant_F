import { useEffect, useState } from "react";
import axios from "axios";

const Restaurants = ({ open, setOpen, editData, refresh }) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    image: "",
    delivery_time: 30,
    rating: 0,
    is_active: true,
  });

  // ================= PREFILL (EDIT MODE) =================
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        address: editData.address || "",
        image: editData.image || "",
        delivery_time: editData.delivery_time || 30,
        rating: editData.rating || 0,
        is_active: editData.is_active ?? true,
      });
    }
  }, [editData]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= VALIDATION =================
  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.address.trim()) return "Address is required";
    if (form.delivery_time <= 0) return "Delivery time must be > 0";
    if (form.rating < 0 || form.rating > 5)
      return "Rating must be between 0 and 5";
    return null;
  };

  // ================= SUBMIT (CREATE / UPDATE) =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) return alert(error);

    try {
      setLoading(true);

      const payload = {
        name: form.name.trim(),
        address: form.address.trim(),
        image: form.image.trim(),
        delivery_time: Number(form.delivery_time),
        rating: Number(form.rating),
        is_active: form.is_active,
      };

      if (editData) {
        // UPDATE
        await axios.put(
          `http://localhost:5000/api/admin/restaurants/${editData.id}`,
          payload,
          { withCredentials: true },
        );
        alert("Restaurant updated ✅");
      } else {
        // CREATE
        await axios.post(
          "http://localhost:5000/api/admin/restaurants",
          payload,
          { withCredentials: true },
        );
        alert("Restaurant created ✅");
      }

      setOpen(false);
      refresh();
    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editData ? "✏️ Edit Restaurant" : "➕ Create Restaurant"}
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-red-500"
          >
            ✖
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Restaurant Name"
            className="border p-3 rounded-lg"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-3 rounded-lg"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-3 rounded-lg"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              name="delivery_time"
              value={form.delivery_time}
              onChange={handleChange}
              placeholder="Delivery Time"
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              step="0.1"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              placeholder="Rating"
              className="border p-3 rounded-lg"
            />
          </div>

          <select
            name="is_active"
            value={form.is_active}
            onChange={(e) =>
              setForm({ ...form, is_active: e.target.value === "true" })
            }
            className="border p-3 rounded-lg"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition"
          >
            {loading
              ? "Processing..."
              : editData
                ? "Update Restaurant"
                : "Create Restaurant"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Restaurants;
