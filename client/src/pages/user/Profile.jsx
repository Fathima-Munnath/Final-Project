import React, { useState } from "react";
import { useFetch } from "../../hooks/UseFetch";
import { axiosInstance } from "../../config/AxiosInstance";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [profileData] = useFetch("/user/profile");
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogOut = async () => {
    try {
      await axiosInstance.get("/user/logout");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?food,dishes')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-white/50"></div>

      {/* Full-Page Container */}
      <div className="relative flex w-full z-10">
        
        {/* Sidebar (30% Width) */}
        <div className="w-1/4 bg-white shadow-xl p-8 min-h-screen">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Account</h2>
          <ul className="space-y-4">
            <li
              className={`p-4 cursor-pointer rounded-lg text-lg font-semibold ${activeTab === "profile" ? "bg-green-500 text-white" : "hover:bg-gray-100"}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </li>
            <li
              className={`p-4 cursor-pointer rounded-lg text-lg font-semibold ${activeTab === "orders" ? "bg-green-500 text-white" : "hover:bg-gray-100"}`}
              onClick={() => setActiveTab("orders")}
            >
              My Orders
            </li>
            <li
              className={`p-4 cursor-pointer rounded-lg text-lg font-semibold ${activeTab === "address" ? "bg-green-500 text-white" : "hover:bg-gray-100"}`}
              onClick={() => setActiveTab("address")}
            >
              Address
            </li>
            <li
              className="p-4 cursor-pointer rounded-lg text-lg font-semibold text-red-500 hover:bg-gray-100"
              onClick={handleLogOut}
            >
              Logout
            </li>
          </ul>
        </div>

        {/* Main Content Area (70% Width) */}
        <div className="w-3/4 p-12">
          {activeTab === "profile" && (
            <div className="text-center">
              <img
                src={profileData?.profiePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-orange-500 shadow-lg mx-auto"
              />
              <h2 className="text-3xl font-bold mt-6 text-gray-800">{profileData?.name}</h2>
              <p className="text-lg text-gray-600">{profileData?.email}</p>
              <p className="text-lg text-gray-600">{profileData?.mobile}</p>

              <Link to="/edit-profile" className="btn bg-blue-500 text-white hover:bg-blue-600 transition mt-6">
                Edit Profile
              </Link>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h2>
              <p className="text-lg text-gray-600">No recent orders available.</p>
            </div>
          )}

          {activeTab === "address" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Saved Addresses</h2>
              <div className="space-y-6">
                <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                  <p className="text-xl font-semibold">Home</p>
                  <p className="text-gray-600">123, Green Street, Calicut, Kerala</p>
                  <p className="text-gray-600">Phone: +91 9876543210</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                  <p className="text-xl font-semibold">Work</p>
                  <p className="text-gray-600">Tech Park, InfoCity, Bangalore</p>
                  <p className="text-gray-600">Phone: +91 8765432109</p>
                </div>
                <button className="btn bg-orange-500 text-white hover:bg-orange-600 mt-6">
                  Add New Address
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
