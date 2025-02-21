import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

export const RestaurantHeader = () => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axiosInstance.get("/restaurant/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-600 to-teal-600 w-full flex items-center justify-between p-4">
      {/* Mobile View - Dropdown Menu */}
      <div className="md:hidden">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-lg shadow-md mt-3 w-52 p-2 z-[1]">
            <li><a onClick={() => navigate("/restaurant/dashboard")}>Dashboard</a></li>
            <li><a onClick={() => navigate("/restaurant/all-orders")}>Orders</a></li>
            <li><a onClick={() => navigate("/restaurant/addMenu")}>Add Menu</a></li>
            <li><a onClick={() => navigate("/restaurant/profile")}>Profile</a></li>
            <li><a onClick={handleLogOut}>Logout</a></li>
          </ul>
        </div>
      </div>

      {/* Center - Logo */}
      <div className="text-2xl font-bold text-white cursor-pointer hover:text-green-300 transition">
        🍔 FoodieHub
      </div>

      {/* Desktop View - Centered Navigation Menu */}
      <div className="hidden md:flex flex-grow justify-center">
        <ul className="flex space-x-8 text-white text-lg">
          <li><a className="cursor-pointer hover:text-green-300" onClick={() => navigate("/restaurant/dashboard")}>Dashboard</a></li>
          <li><a className="cursor-pointer hover:text-green-300" onClick={() => navigate("/restaurant/all-orders")}>Orders</a></li>
          <li><a className="cursor-pointer hover:text-green-300" onClick={() => navigate("/restaurant/addMenu")}>Add Menu</a></li>
          <li><a className="cursor-pointer hover:text-green-300" onClick={() => navigate("/restaurant/profile")}>Profile</a></li>
          <li><a className="cursor-pointer hover:text-red-300" onClick={handleLogOut}>Logout</a></li>
        </ul>
      </div>
    </div>
  );
};
