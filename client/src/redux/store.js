import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import restaurantReducer from "./features/restaurantSlice"
export const store = configureStore({
    reducer: {
        user: userReducer,
        restaurant:restaurantReducer
    },
});