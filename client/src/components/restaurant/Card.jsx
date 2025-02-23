import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const MenuCards = ({ menuItem,}) => {
  const navigate = useNavigate();
  console.log("menuid===", menuItem)

  // Handle menu update by navigating to update page
  // const handleUpdate = async () => {
  //   try {
  //     navigate(`/restaurant/addMenu/${menuItem?._id}`);
  //   } catch (error) {
  //     toast.error("Error navigating to update menu");
  //   }
  // };

  // Handle menu delete
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/menu/deleteMenu/${menuItem?._id}`);
      toast.success(response.data.message || "Menu item deleted successfully");
      setRefreshState((prev) => !prev); // Refresh menu list after deletion
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting menu item");
    }
  };

  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 w-full max-w-xs">
      <figure
        className="h-40 flex justify-center items-center bg-gray-200 cursor-pointer overflow-hidden"
        onClick={() => navigate(`/menuDetails/${menuItem?._id}`)}
      >
        <img src={menuItem?.image} alt="Menu Item" className="h-full w-full object-cover transition-opacity duration-300 hover:opacity-80" />
      </figure>

      <div className="card-body p-5 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{menuItem?.name}</h2>
        <p className="text-sm text-gray-700 truncate">
          {menuItem?.description?.length > 50 ? `${menuItem?.description.substring(0, 50)}...` : menuItem?.description}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-md font-bold text-green-600">₹{menuItem?.price}</p>
          <p className="text-xs text-gray-500">{menuItem?.category} | {menuItem?.restaurantId?.name}</p>
        </div>
        <div className="card-actions flex justify-between mt-3">
          <button
            type="button"
            className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
