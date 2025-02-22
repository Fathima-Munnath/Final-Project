import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteRestaurant = () => {
    const { isRestaurantAuth, restaurantData } = useSelector((state) => state.restaurant);

    // loading

    const navigate = useNavigate();

    // useEffect(() => {
    if (! isRestaurantAuth) {
        navigate("/restaurant/login");
        return;
    }
    // }, []);

    return <Outlet />;
};