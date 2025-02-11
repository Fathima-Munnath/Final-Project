import React from "react";
import { useNavigate } from "react-router-dom";

export const RestaurantHeaderBeforeLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-white shadow-md px-6">
      {/* Left - Logo */}
      <div className="navbar-start">
        <a className="text-2xl font-bold text-green-600 cursor-pointer" onClick={() => navigate("/")}>
          FoodExpress 🍽️
        </a>
      </div>

      {/* Center - Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a onClick={() => navigate("/")}>Home</a>
          </li>
          <li>
            <a onClick={() => navigate("/about")}>About Us</a>
          </li>
          <li>
            <a onClick={() => navigate("/contact")}>Contact</a>
          </li>
        </ul>
      </div>

      {/* Right - Actions */}
      <div className="navbar-end flex gap-4">
        <button className="btn btn-outline btn-primary" onClick={() => navigate("/restaurant/signup")}>
          Sign Up
        </button>
        <button className="btn btn-primary" onClick={() => navigate("/restaurant/login")}>
          Login
        </button>
      </div>
    </div>
  );
};
