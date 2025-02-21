import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteRestaurant = () => {
    const { isRestaurantAuth } = useSelector((state) => state.restaurant);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isRestaurantAuth === undefined) return; // Avoid navigating before checking auth state

        if (!isRestaurantAuth) {
            navigate("/restaurant/login");
        } else {
            setLoading(false);
        }
    }, [isRestaurantAuth, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-600">Loading...</p>
            </div>
        );
    }

    return <Outlet />;
};
