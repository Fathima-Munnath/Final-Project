import React from "react";
import { useNavigate } from "react-router-dom";

export const RestaurantHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-white shadow-md px-6">
      {/* Left - Sidebar Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a onClick={() => navigate("/restaurant/dashboard")}>Dashboard</a>
            </li>
            <li>
              <a onClick={() => navigate("/restaurant/orders")}>Orders</a>
            </li>
            <li>
              <a onClick={() => navigate("/restaurant/menu")}>Manage Menu</a>
            </li>
            <li>
              <a onClick={() => navigate("/restaurant/profile")}>Profile</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Center - Logo */}
      <div className="navbar-center">
        <a className="text-2xl font-bold text-green-600 cursor-pointer" onClick={() => navigate("/restaurant/dashboard")}>
          FoodExpress 🍽️
        </a>
      </div>

      {/* Right - Actions (Notifications & Profile) */}
      <div className="navbar-end flex gap-4">
        {/* Orders Notification */}
        <button className="btn btn-ghost btn-circle" onClick={() => navigate("/restaurant/orders")}>
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h11m-5-5l5 5-5 5" />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>

        {/* Profile */}
        <button className="btn btn-ghost btn-circle" onClick={() => navigate("/restaurant/profile")}>
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src="https://via.placeholder.com/40" alt="Profile" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
