import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";

export const MenuCards = ({ menuItem, handleDelete }) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/editMenu/${menuItem?._id}`);
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
        <p className="text-sm text-gray-700 truncate">{menuItem?.description?.length > 50 ? `${menuItem?.description.substring(0, 50)}...` : menuItem?.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-md font-bold text-green-600">₹{menuItem?.price}</p>
          <p className="text-xs text-gray-500">{menuItem?.category} | {menuItem?.restaurantId?.name}</p>
        </div>
        <div className="card-actions flex justify-between mt-3">
          <button
            type="button"
            className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-md"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            type="button"
            className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 shadow-md"
            onClick={() => handleDelete(menuItem?._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
