import { NavLink, Outlet } from "react-router-dom";

import { MdDashboard, MdRestaurant, MdShoppingBag } from "react-icons/md";

import { FaUsers } from "react-icons/fa";

const AdminPanel = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white p-5">
        {/* LOGO */}
        <h1 className="text-2xl font-bold mb-8 text-green-400">Admin Panel</h1>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2">
          {/* DASHBOARD */}
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive ? "bg-green-500 text-white" : "hover:bg-gray-800"}`
            }
          >
            <MdDashboard size={22} />
            <span>Dashboard</span>
          </NavLink>

          {/* USERS */}
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive ? "bg-green-500 text-white" : "hover:bg-gray-800"}`
            }
          >
            <FaUsers size={20} />
            <span>Users</span>
          </NavLink>

          {/* RESTAURANTS */}
          <NavLink
            to="/admin/restaurants"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive ? "bg-green-500 text-white" : "hover:bg-gray-800"}`
            }
          >
            <MdRestaurant size={22} />
            <span>Restaurants</span>
          </NavLink>

          {/* ORDERS */}
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive ? "bg-green-500 text-white" : "hover:bg-gray-800"}`
            }
          >
            <MdShoppingBag size={22} />
            <span>Orders</span>
          </NavLink>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
