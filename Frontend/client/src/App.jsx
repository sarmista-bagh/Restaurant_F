import Navbar from "./components/Header";
import { Outlet } from "react-router-dom";
import LocationPicker from "./components/LocationPicker";
import { useLocation } from "../context/LocationContext";

export const AppLayout = () => {
  const { location, setLocation } = useLocation();

  // BLOCK APP UNTIL LOCATION IS SELECTED
  if (!location) {
    return (
      <LocationPicker
        onLocationSelect={(data) => {
          setLocation(data);
        }}
      />
    );
  }

  // NORMAL APP FLOW
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
