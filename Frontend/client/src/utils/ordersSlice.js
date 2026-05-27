import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
    },
    reducers: {
        placeOrder: (state, action) => {
            state.orders.push(action.payload);
        },
        clearOrders: (state) => {
            state.orders = [];
        },
    },
});

export const { placeOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;