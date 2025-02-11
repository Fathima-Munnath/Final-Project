import React from "react";
import { useNavigate } from "react-router-dom";

export const MenuCards = ({ menuItem }) => {
  console.log("menuCard======", menuItem);
  const navigate = useNavigate();

  return (
    <div className="card bg-base-100 w-full max-w-xs shadow-xl">
      <figure className="h-40 flex justify-center items-center">
        <img src={menuItem?.image} alt="MenuItems" className="h-full w-full object-cover rounded-t-lg" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{menuItem?.name} </h2>
        <p>Price: {menuItem?.price} Rs</p>
        <div className="card-actions justify-end">
          <button type="button" 
             class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => navigate(`/menuDetails/${menuItem?._id}`)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};
