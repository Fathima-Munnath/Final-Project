import React from "react";
import { useFetch } from "../../hooks/UseFetch";
import { axiosInstance } from "../../config/AxiosInstance";

export const RestaurantProfile = () => {
  const [profileData] = useFetch("/restaurant/profile");

  const handleLogOut = async () => {
    try {
      await axiosInstance.get("/restaurant/logout");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-white/50"></div>

      {/* Profile Container */}
      <div className="relative flex w-full justify-center items-center z-10">
        <div className="bg-white shadow-xl p-8 rounded-lg w-full max-w-lg text-center">
          <img
            src={profileData?.profiePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-orange-500 shadow-lg mx-auto"
          />
          <h2 className="text-3xl font-bold mt-6 text-gray-800">{profileData?.name}</h2>
          <p className="text-lg text-gray-600">{profileData?.email}</p>
          <p className="text-lg text-gray-600">{profileData?.mobile}</p>
          <p className="text-lg text-gray-600">Role: {profileData?.role}</p>

          <button
            onClick={handleLogOut}
            className="btn bg-red-500 text-white hover:bg-red-600 transition mt-6"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
