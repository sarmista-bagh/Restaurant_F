import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lat: null,
    lng: null,
    address: "",
};

const locationSlice = createSlice({
    name: "location",
    initialState,

    reducers: {
        setLocation: (state, action) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
            state.address = action.payload.address || "";
        },

        clearLocation: (state) => {
            state.lat = null;
            state.lng = null;
            state.address = "";
        },
    },
});

export const { setLocation, clearLocation } =
    locationSlice.actions;

export default locationSlice.reducer;