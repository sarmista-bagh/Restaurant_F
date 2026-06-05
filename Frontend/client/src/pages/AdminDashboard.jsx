import { useEffect, useState } from "react";
import axios from "axios";

import Foods from "../restaurantManagement/Foods";
import OrderItems from "../restaurantManagement/OrderItems";
import Restaurants from "../restaurantManagement/Restaurants";
import Orders from "../restaurantManagement/Orders";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  FaHome,
  FaUsers,
  FaStore,
  FaShoppingCart,
  FaRupeeSign,
  FaBox,
  FaUtensils,
  FaClipboardList,
  FaChartLine,
} from "react-icons/fa";

/* ================= SIDEBAR ================= */
const Sidebar = ({ active, setActive }) => {
  const menu = [
    { key: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { key: "orders", label: "Orders", icon: <FaBox /> },
    { key: "orderItems", label: "Order Items", icon: <FaClipboardList /> },
    { key: "foods", label: "Foods", icon: <FaUtensils /> },
    { key: "restaurants", label: "Restaurants", icon: <FaStore /> },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg p-4">
      <h1 className="text-xl font-bold text-orange-500 mb-6">Admin Panel</h1>

      <div className="space-y-2">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
              active === item.key
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

/* ================= MAIN DASHBOARD ================= */
export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");

  const [stats, setStats] = useState({
    users: 0,
    restaurants: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
    delivered: 0,
  });

  const [analytics, setAnalytics] = useState([]);
  const [liveOrders, setLiveOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DASHBOARD ================= */
  const fetchDashboard = async () => {
    try {
      // const res = await axios.get("http://localhost:5000/api/admin/dashboard", {
      //   withCredentials: true,
      // });

      const res = await axios.get(
        "https://menu-gdbm.onrender.com/api/admin/dashboard",
        {
          withCredentials: true,
        },
      );

      setStats({
        users: Number(res.data?.users || 0),
        restaurants: Number(res.data?.restaurants || 0),
        orders: Number(res.data?.orders || 0),
        revenue: Number(res.data?.revenue || 0),
        pending: Number(res.data?.pending || 0),
        delivered: Number(res.data?.delivered || 0),
      });
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= ANALYTICS ================= */
  const fetchAnalytics = async () => {
    try {
      // const res = await axios.get(
      //   "http://localhost:5000/api/admin/analytics/daily",
      //   { withCredentials: true },
      // );

      const res = await axios.get(
        "https://menu-gdbm.onrender.com/api/admin/analytics/daily",
        { withCredentials: true },
      );

      setAnalytics(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= LIVE ORDERS ================= */
  const fetchLiveOrders = async () => {
    try {
      // const res = await axios.get(
      //   "http://localhost:5000/api/admin/orders/live",
      //   { withCredentials: true },
      // );

      const res = await axios.get(
        "https://menu-gdbm.onrender.com/api/admin/orders/live",
        { withCredentials: true },
      );

      setLiveOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = () => {
      fetchDashboard();
      fetchAnalytics();
      fetchLiveOrders();
    };

    load();
    const interval = setInterval(load, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ================= CARD ================= */
  const Card = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow flex items-center gap-4">
      <div className={`p-3 rounded-xl text-white ${color}`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-xl font-bold">{value ?? 0}</h2>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* SIDEBAR */}
      <Sidebar active={active} setActive={setActive} />

      {/* CONTENT */}
      <div className="flex-1 p-6">
        {/* DASHBOARD */}
        {active === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <FaHome className="text-orange-500" />
              Admin Dashboard
            </h1>

            {/* STATS */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card
                title="Users"
                value={stats.users}
                icon={<FaUsers />}
                color="bg-blue-500"
              />
              <Card
                title="Restaurants"
                value={stats.restaurants}
                icon={<FaStore />}
                color="bg-green-500"
              />
              <Card
                title="Orders"
                value={stats.orders}
                icon={<FaShoppingCart />}
                color="bg-purple-500"
              />
              <Card
                title="Revenue"
                value={`₹${stats.revenue}`}
                icon={<FaRupeeSign />}
                color="bg-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card
                title="Pending"
                value={stats.pending}
                icon={<FaBox />}
                color="bg-yellow-500"
              />
              <Card
                title="Delivered"
                value={stats.delivered}
                icon={<FaBox />}
                color="bg-emerald-500"
              />
            </div>

            {/* ANALYTICS */}
            <div className="bg-white p-6 rounded-2xl shadow mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="text-green-500" />
                <h2 className="font-semibold">Analytics</h2>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line type="monotone" dataKey="revenue" stroke="#22c55e" />
                  <Line type="monotone" dataKey="pending" stroke="#f59e0b" />
                  <Line type="monotone" dataKey="delivered" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* LIVE ORDERS */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="font-semibold mb-4">Live Orders</h2>

              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2">ID</th>
                    <th className="p-2">User</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {liveOrders.map((o) => (
                    <tr key={o.id} className="border-b">
                      <td className="p-2">#{o.id}</td>
                      <td className="p-2">{o.user_name}</td>
                      <td className="p-2">₹{o.total_price}</td>
                      <td className="p-2">{o.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* MODULES */}
        {active === "orders" && <Orders />}
        {active === "orderItems" && <OrderItems />}
        {active === "foods" && <Foods />}
        {active === "restaurants" && <Restaurants />}
      </div>
    </div>
  );
}
