import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteRestaurant = () => {
    const { isRestaurantAuth } = useSelector((state) => state.restaurant);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isRestaurantAuth) {
            navigate("/login");
        }
    }, [isRestaurantAuth, navigate]);  // Added dependencies

    return isRestaurantAuth ? <Outlet /> : null; // Prevents rendering when not authenticated
};
