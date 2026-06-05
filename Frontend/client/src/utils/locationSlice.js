// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     lat: null,
//     lng: null,
//     address: "",
// };

// const locationSlice = createSlice({
//     name: "location",
//     initialState,

//     reducers: {
//         setLocation: (state, action) => {
//             state.lat = action.payload.lat;
//             state.lng = action.payload.lng;
//             state.address = action.payload.address || "";
//         },

//         clearLocation: (state) => {
//             state.lat = null;
//             state.lng = null;
//             state.address = "";
//         },
//     },
// });

// export const { setLocation, clearLocation } =
//     locationSlice.actions;

// export default locationSlice.reducer;




import { createSlice } from "@reduxjs/toolkit";

/* ---------------- SAFE INITIAL STATE ---------------- */
const getInitialCart = () => {
    if (typeof window === "undefined") return [];

    try {
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : [];
    } catch (err) {
        return [];
    }
};

const initialState = {
    items: getInitialCart(),
};

/* ---------------- SLICE ---------------- */
const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        // ➕ ADD ITEM (WITH QTY LOGIC)
        addItem: (state, action) => {
            const item = action.payload;

            const existing = state.items.find(
                (i) => i.card.info.id === item.card.info.id
            );

            if (existing) {
                existing.qty += 1;
            } else {
                state.items.push({
                    ...item,
                    qty: 1,
                });
            }

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        // ➖ REMOVE SINGLE ITEM (DECREASE QTY)
        removeItem: (state, action) => {
            const id = action.payload;

            const existing = state.items.find(
                (i) => i.card.info.id === id
            );

            if (existing) {
                existing.qty -= 1;

                if (existing.qty <= 0) {
                    state.items = state.items.filter(
                        (i) => i.card.info.id !== id
                    );
                }
            }

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        // 🧹 CLEAR CART
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem("cart");
        },
    },
});

/* ---------------- EXPORTS ---------------- */
export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;