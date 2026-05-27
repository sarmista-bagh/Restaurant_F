import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../pages/AppLayout";
import About from "../components/About";
import Error from "../components/Error";
import Home from "../pages/Home";
import Contact from "../components/Contact";

import RestaurantDetails from "../components/RestaurantDetails";
import Checkout from "../pages/Checkout";
import CartSystem from "../pages/CartSystem";
import Orders from "../pages/Orders";

import Login from "../auth/Login";
import Register from "../auth/Register";

import ProtectedRoute from "./ProtectedRoute";

import AdminDashboard from "../pages/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      /* ================= PUBLIC ROUTES ================= */

      {
        index: true,
        element: <Home />,
      },

      {
        path: "about",
        element: <About />,
      },

      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "restaurants/:resId",
        element: <RestaurantDetails />,
      },

      /* ================= AUTH ROUTES ================= */

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },

      /* ================= ADMIN ROUTE ================= */

      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },

      /* ================= USER ROUTES ================= */

      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartSystem />
          </ProtectedRoute>
        ),
      },

      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },

      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
