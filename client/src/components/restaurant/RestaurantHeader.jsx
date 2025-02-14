import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/AxiosInstance";
import { Link } from "react-router-dom";

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
    <div className="navbar bg-gradient-to-r from-green-600 to-teal-600 shadow-md px-6">
      {/* Left - Sidebar Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-lg shadow-md mt-3 w-52 p-2 z-[1]">
            <li><a onClick={() => navigate("/")}>Home</a></li>
            <li><a onClick={() => navigate("/restaurant/dashboard")}>Dashboard</a></li>
            <li><a onClick={() => navigate("/restaurant/orders")}>Orders</a></li>
            <li><a onClick={() => navigate("/restaurant/addMenu")}>Add Menu</a></li>
            <li><a onClick={() => navigate("/restaurant/profile")}>Profile</a></li>
            <li><Link to="restaurant/logout" onClick={handleLogOut}>Logout</Link></li>
          </ul>
        </div>
      </div>

      {/* Center - Logo */}
      <div className="navbar-center">
        <a className="text-2xl font-bold text-white cursor-pointer hover:text-green-700 transition" onClick={() => navigate("/restaurant/dashboard")}>
        🍔 FoodieHub
        </a>
      </div>
      {/* <div>
      <Link to="/logout" className="block px-4 py-3 hover:bg-gray-200" onClick={handleLogOut}>Logout</Link>
      </div> */}
      {/* Right - Actions (Notifications & Profile) */}
    </div>
  );
};
