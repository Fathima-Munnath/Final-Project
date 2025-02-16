import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/UseFetch";
//import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/AxiosInstance";

export const Profile = () => {
  const [profileData, loading] = useFetch("/user/profile");
  const [activeTab, setActiveTab] = useState("profile");
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
    setIsSubmitting(true); // Show loading state

    try {
      const response = await axiosInstance.put("/user/profile-update", formData);
      toast.success("Profile updated successfully!");

      // // Update local state instantly
      // setProfileData((prev) => ({
      //   ...prev,
      //   ...formData,
      // }));
    } 
    catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } 
    finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div
      className="flex flex-col md:flex-row min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?food,dishes')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-white/50"></div>

      {/* Sidebar (25% Width on Large Screens) */}
      <div className="relative w-full md:w-1/4 bg-white shadow-xl p-8 min-h-screen z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Account</h2>
        <ul className="space-y-4">
          {["profile", "orders", "address"].map((tab) => (
            <li
              key={tab}
              className={`p-4 cursor-pointer rounded-lg text-lg font-semibold ${
                activeTab === tab ? "bg-green-500 text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "profile" ? "Profile" : tab === "orders" ? "My Orders" : "Address"}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full md:w-3/4 p-6 md:p-12 z-10">
        {activeTab === "profile" && (
           <div className="relative w-full md:w-3/4 p-6 md:p-12 z-10">
           {loading ? (
             <p className=" text-lg">Loading profile...</p>
           ) : (
             <div className="max-w-lg p-6 rounded-lg">
               <div className="text-center">
                 <img
                   src={formData.profilePic}
                   alt="Profile"
                   className="w-32 h-32 rounded-full border-4 border-orange-500 shadow-lg mx-auto"
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
              {[
                { type: "Home", address: "123, Green Street, Calicut, Kerala", phone: "+91 9876543210" },
                { type: "Work", address: "Tech Park, InfoCity, Bangalore", phone: "+91 8765432109" },
              ].map((addr, index) => (
                <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md">
                  <p className="text-xl font-semibold">{addr.type}</p>
                  <p className="text-gray-600">{addr.address}</p>
                  <p className="text-gray-600">Phone: {addr.phone}</p>
                </div>
              ))}
              <button className="btn bg-orange-500 text-white hover:bg-orange-600 mt-6 px-6 py-2 rounded-lg">
                Add New Address
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
