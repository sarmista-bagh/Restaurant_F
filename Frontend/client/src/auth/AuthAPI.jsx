import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const AuthAPI = ({ setUser }) => {
  const [loading, setLoading] = useState(true);

  // ================= FETCH CURRENT USER =================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me");

        const user = res.data.user;

        //  SAVE USER IN APP STATE
        setUser(user);

        //  LOCAL STORAGE BACKUP
        localStorage.setItem("user", JSON.stringify(user));

        //  ROLE LOG
        console.log("Logged in as:", user?.role);
      } catch (err) {
        console.log("Auth Error:", err.response?.data || err.message);

        // REMOVE INVALID USER
        setUser(null);

        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser]);

  // ================= LOADING SCREEN =================
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          {/* LOADER */}
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          {/* TEXT */}
          <p className="mt-4 text-gray-600 font-medium">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthAPI;
