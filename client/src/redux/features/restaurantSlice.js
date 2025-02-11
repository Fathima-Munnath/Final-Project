import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isRestaurantAuth: false,
    restaurantData: {},
};

export const restaurantSlice = createSlice({
    name: "restaurant",
    initialState,
    reducers: {
        saveRestaurant: (state, action) => {
            state.isRestaurantAuth = true;
            state.restaurantData = action.payload;
        },
        clearRestaurant: (state) => {
            state.isRestaurantAuth = false;
            state.restaurantData= {};
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveRestaurant, clearRestaurant } = restaurantSlice.actions;

export default restaurantSlice.reducer;
