import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },

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
        },

        // ➖ REMOVE SINGLE ITEM (DECREASE QTY)
        removeItem: (state, action) => {
            const id = action.payload;

            const existing = state.items.find(
                (i) => i.card.info.id === id
            );

            if (existing) {
                existing.qty -= 1;

                if (existing.qty === 0) {
                    state.items = state.items.filter(
                        (i) => i.card.info.id !== id
                    );
                }
            }
        },

        // 🧹 CLEAR CART
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;