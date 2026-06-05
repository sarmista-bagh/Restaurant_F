import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./ordersSlice";
import cartReducer from "./cartSlice";
import locationReducer from "./locationSlice";
import authReducer from "./authSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
    location: locationReducer,
    auth: authReducer,
  },
});
export default appStore;
