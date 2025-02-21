import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isUserAuth } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isUserAuth === undefined) return; // Avoid navigating before checking auth state

        if (!isUserAuth) {
            navigate("/login");
        } else {
            setLoading(false);
        }
    }, [isUserAuth, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-600">Loading...</p>
            </div>
        );
    }

    return <Outlet />;
};
