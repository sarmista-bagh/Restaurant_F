import { LOGO_URL } from "../utils/constants";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import {
  FaUserCircle,
  FaChevronDown,
  FaChevronUp,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaClipboardList,
  FaUserShield,
} from "react-icons/fa";

import { logout } from "../utils/authSlice";

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const user = useSelector((store) => store.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-orange-500 font-semibold"
      : "text-gray-700";

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_URL} alt="logo" className="h-10 w-10 rounded-lg" />
            <div>
              <span className="text-lg font-bold text-orange-500">
                FoodExpress
              </span>
              <p className="text-xs text-gray-500">Fast Delivery</p>
            </div>
          </Link>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className={`flex items-center gap-1 ${isActive("/")}`}>
              <FaHome /> Home
            </Link>

            <Link
              to="/about"
              className={`flex items-center gap-1 ${isActive("/about")}`}
            >
              <FaInfoCircle /> About
            </Link>

            <Link
              to="/contact"
              className={`flex items-center gap-1 ${isActive("/contact")}`}
            >
              <FaPhone /> Contact
            </Link>

            <Link
              to="/orders"
              className={`flex items-center gap-1 ${isActive("/orders")}`}
            >
              <FaClipboardList /> Orders
            </Link>

            {/* ADMIN */}

            {user?.role?.toLowerCase() === "admin" && (
              <Link
                to="/admin"
                className="flex items-center gap-1 text-purple-600 font-semibold"
              >
                <FaUserShield /> Admin
              </Link>
            )}

            {/* CART */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-orange-500 text-white px-3 py-1.5 rounded-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* AUTH */}
            {!user ? (
              <>
                <Link to="/login" className={isActive("/login")}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-black text-white px-3 py-1 rounded"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                {/* PROFILE */}
                <button
                  onClick={() => setOpen(!open)}
                  className="bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2 hover:shadow-md"
                >
                  <FaUserCircle />
                  <span>{user?.name}</span>

                  {open ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {/* DROPDOWN */}
                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg z-50">
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaClipboardList /> My Orders
                    </Link>

                    {user?.role === "superadmin" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 hover:bg-gray-100 text-purple-600 flex items-center gap-2"
                      >
                        <FaUserShield /> Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
