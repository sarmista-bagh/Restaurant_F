// import { createSlice } from "@reduxjs/toolkit";

// /* ---------------- SAFE INITIAL STATE ---------------- */
// const getInitialUser = () => {
//     try {
//         const user = localStorage.getItem("user");
//         return user ? JSON.parse(user) : null;
//     } catch (err) {
//         return null;
//     }
// };

// const initialState = {
//     user: getInitialUser(),
// };

// /* ---------------- SLICE ---------------- */
// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {

//         /* LOGIN / REGISTER */
//         setUser: (state, action) => {
//             state.user = action.payload;

//             // persist login
//             localStorage.setItem("user", JSON.stringify(action.payload));
//         },

//         /* LOGOUT */
//         logout: (state) => {
//             state.user = null;

//             localStorage.removeItem("user");
//         },
//     },
// });

// /* ---------------- EXPORTS ---------------- */
// export const { setUser, logout } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

/* ---------------- SAFE INITIAL STATE ---------------- */
const getInitialUser = () => {
    if (typeof window === "undefined") return null;

    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (err) {
        return null;
    }
};

const initialState = {
    user: getInitialUser(),
};

/* ---------------- SLICE ---------------- */
const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        // LOGIN / REGISTER
        setUser: (state, action) => {
            state.user = action.payload;

            if (typeof window !== "undefined") {
                localStorage.setItem(
                    "user",
                    JSON.stringify(action.payload)
                );
            }
        },

        // LOGOUT
        logout: (state) => {
            state.user = null;

            if (typeof window !== "undefined") {
                localStorage.removeItem("user");
            }
        },
    },
});

/* ---------------- EXPORTS ---------------- */
export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;