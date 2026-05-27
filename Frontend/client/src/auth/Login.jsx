import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../utils/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        {
          withCredentials: true,
        },
      );

      const user = res.data.user || res.data;

      // ✅ SAVE USER IN REDUX
      dispatch(setUser(user));

      // ✅ LOCAL STORAGE BACKUP
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ ROLE BASED REDIRECT
      if (user?.role?.toLowerCase() === "superadmin") {
        navigate("/admin");
      } else if (user?.role?.toLowerCase() === "restaurant") {
        navigate("/restaurant-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ================= LEFT SIDE ================= */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold leading-tight">
            Hungry? 🍕
            <br />
            <span className="text-black">We deliver fast ⚡</span>
          </h1>

          <p className="mt-6 text-white/90 text-lg">
            Order food from top restaurants, track live delivery and enjoy your
            meal at home.
          </p>

          <div className="mt-10 flex gap-3">
            <div className="h-2 w-2 bg-white rounded-full"></div>
            <div className="h-2 w-2 bg-white/70 rounded-full"></div>
            <div className="h-2 w-2 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border">
          {/* TITLE */}
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome Back 👋
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Login to continue ordering food
          </p>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-600">Email</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-600">Password</label>

              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                required
              />
            </div>

            {/* ERROR */}
            {error && (
              <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* REGISTER LINK */}
          <p className="text-sm text-center mt-5 text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-orange-500 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
