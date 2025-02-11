import React from "react";
import { useNavigate } from "react-router-dom";

export const ErrorPage = ({ role }) => {
    const navigate = useNavigate();
    const user = {
        home_route: "",
    };

    if (role == "restaurant") {
        user.home_route = "/restaurant";
    }

    console.log("role===", role);
    return (
        <div>
            <h1>404 - Page Not Found !</h1>
            <button className="btn btn-accent" onClick={() => navigate(user.home_route)}>
                Navigate to Home
            </button>
        </div>
    );
};