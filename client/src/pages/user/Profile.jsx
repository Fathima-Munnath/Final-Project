import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/UseFetch";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/AxiosInstance";
import AddressForm from "../../components/user/AddressForm";
import { Orders } from "../../components/user/Orders";

export const Profile = () => {
  const [profileData, loading] = useFetch("/user/profile");
  const [activeTab, setActiveTab] = useState("profile");
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [formData, setFormData] = useState({
    profilePic: "",
    name: "",
    email: "",
    mobile: "",
    role: "",
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        profilePic: profileData.profilePic || "https://via.placeholder.com/150",
        name: profileData.name || "",
        email: profileData.email || "",
        mobile: profileData.mobile || "",
        role: profileData.role || "",
      });
    }
  }, [profileData]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axiosInstance.put("/user/profile-update", formData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-cover bg-center relative">
      {/* Sidebar */}
      <div className="relative w-full md:w-1/4 bg-white shadow-xl p-4 md:p-8 h-auto z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-6">My Account</h2>
        <ul className="space-y-2 md:space-y-4">
          <li
            className={`p-3 md:p-4 cursor-pointer rounded-lg text-sm md:text-lg font-semibold ${activeTab === "profile" ? "bg-green-500 text-white" : "hover:bg-gray-100"}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </li>
          <li
            className={`p-3 md:p-4 cursor-pointer rounded-lg text-sm md:text-lg font-semibold ${activeTab === "orders" ? "bg-green-500 text-white" : "hover:bg-gray-100"}`}
            onClick={() => setActiveTab("orders")}
          >
            My Orders
          </li>
          <li
            className={`p-3 md:p-4 cursor-pointer rounded-lg text-sm md:text-lg font-semibold ${activeTab === "address" ? "bg-green-500 text-white" : "hover:bg-gray-100"}`}
            onClick={() => setActiveTab("address")}
          >
            Address
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="relative w-full md:w-3/4 p-4 md:p-6 z-10 h-full">
        {activeTab === "profile" && (
          <div className="relative w-full p-4 md:p-6">
            {loading ? (
              <p className="text-lg">Loading profile...</p>
            ) : (
              <div className="max-w-lg p-6 rounded-lg">
                <div className="text-center">
                  <img
                    src={formData.profilePic}
                    alt="Profile"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-orange-500 shadow-lg mx-auto"
                  />
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 rounded-md transition ${isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
        {activeTab === "orders" && <Orders />}
        {activeTab === "address" && <AddressForm />}
      </div>
    </div>
  );
};
