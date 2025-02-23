import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const MenuCards = ({ menuItem }) => {
  console.log("menuCard======", menuItem);
  const navigate = useNavigate();

  const addToCart = async (menuItem) => {
    try {
      let quantity = 1;
      let menuId = menuItem?._id
      console.log("menuId:" + menuItem?._id);

      const response = await axiosInstance({
        method: "POST",
        url: "/cart/add-to-cart",
        data: { menuItemId: menuId, quantity },
      });
      console.log(response);
      toast.success("Menu added to cart");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
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
            onClick={(event) => {
              event.stopPropagation(); // Prevent click event from bubbling to parent div
              addToCart(menuItem);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};


export const CartCards = ({ items, handleRemove, handleQuantityChange }) => {
  console.log("item=====", items);
  return (
    <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 mb-4">
      {/* Item Image */}
      <img src={items?.menuItemId?.image} alt="cart-item" className="w-24 h-20 object-cover rounded-md" />

      {/* Item Details */}
      <div className="flex-1 px-4">
        <h2 className="text-lg font-semibold">{items?.menuItemId?.name}</h2>
        <h3 className="text-gray-600">₹{items?.menuItemId?.price}</h3>
      </div>
      {/* Quantity Controls */}
      {/* <div className="flex items-center border rounded-md bg-white px-2">
        <button
          className="px-3 py-1 text-lg font-bold text-gray-600 hover:text-red-500"
          onClick={() => handleQuantityChange(items?.menuItemId?._id, items.quantity - 1)}
          disabled={items.quantity <= 1}
        >
          -
        </button>
        <span className="px-3 text-lg">{items.quantity}</span>
        <button
          className="px-3 py-1 text-lg font-bold text-gray-600 hover:text-green-500"
          onClick={() => handleQuantityChange(items?.menuItemId?._id, items.quantity + 1)}
        >
          +
        </button>
      </div> */}
      {/* Remove Button */}
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
        onClick={() => handleRemove(items?.menuItemId?._id)}
      >
        Remove
      </button>
    </div>
  );
};
