import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/AxiosInstance";
import { useFetch } from "../../hooks/UseFetch";
import toast from "react-hot-toast";

export const RestaurantProfile = () => {
  const [profileData, isLoading, error] = useFetch("/restaurant/profile"); // Extract correctly
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    profilePic: "https://via.placeholder.com/150",
  });

  console.log("profileData===", profileData);

  useEffect(() => {
    if (profileData) {
      setFormData({
        profilePic: profileData.profilePic || "https://via.placeholder.com/150",
        name :profileData.name || "",
        email:profileData.email || "",
        mobile:profileData.mobile || "",
      });
    }
  }, [profileData]); // Only updates when valid data changes

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axiosInstance.put("/restaurant/profile-update", formData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center">
      <div className="bg-white shadow-xl p-8 rounded-lg w-full max-w-lg text-center">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error loading profile.</p>
        ) : (
          <>
            <div className="relative inline-block">
              <img
                src={formData.profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-orange-500 shadow-lg mx-auto"
              />
            </div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="mt-6 text-left">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                <label className="block text-gray-700 mt-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                <label className="block text-gray-700 mt-2">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 rounded-md transition ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
