import React from "react";
import { useNavigate } from "react-router-dom";

export const MenuCards = ({ menuItem }) => {
  console.log("menuCard======", menuItem);
  const navigate = useNavigate();

  return (
    <div className="card bg-base-100 w-full max-w-xs rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <figure
        className="h-40 flex justify-center items-center bg-gray-200 cursor-pointer"
        onClick={() => navigate(`/menuDetails/${menuItem?._id}`)}
      >
        <img src={menuItem?.image} alt="Menu Item" className="h-full w-full object-cover transition-opacity duration-300 hover:opacity-80" />
      </figure>

      {/* Content Section */}
      <div className="card-body p-4" onClick={() => navigate(`/menuDetails/${menuItem?._id}`)}>
        {/* Restaurant Name & Rating */}
        <div className="flex items-center justify-between">
      <h2 className="text-sm font-bold text-gray-800 flex-grow">{menuItem?.name}</h2>
      <p className="text-sm font-bold text-green-600 text-right">₹{menuItem?.price}</p>
    </div>
        <p className="text-xs text-gray-700">
          {menuItem?.description?.length > 40
            ? `${menuItem?.description.substring(0, 40)}...`
            : menuItem?.description}
        </p>
        {/* Category & Location */}
        <p className="text-xs text-gray-500">{menuItem?.category} | {menuItem?.restaurantId?.name}</p>
        <div className="card-actions">
          <button
            type="button"
            className="px-3 py-2 w-full text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
            onClick={() => addToCart(menuItem)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
