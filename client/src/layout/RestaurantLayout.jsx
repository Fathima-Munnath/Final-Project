import React, { useEffect } from "react";
import { RestaurantHeader } from "../components/restaurant/RestaurantHeader";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { axiosInstance } from "../config/AxiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { clearRestaurant, saveRestaurant } from "../redux/features/restaurantSlice";

export const RestaurantLayout = () => {
  const { isRestaurantAuth } = useSelector((state) => state.restaurant); // Ensure correct slice
  const dispatch = useDispatch();
  const location = useLocation();

  console.log("isRestaurantAuth====", isRestaurantAuth);

  const checkRestaurant = async () => {
    try {
      const response = await axiosInstance.get("/restaurant/check-restaurant");
      dispatch(saveRestaurant(response.data)); // Ensure correct data is saved
    } catch (error) {
      dispatch(clearRestaurant());
      console.error("Restaurant authentication failed:", error);
    }
  };

  useEffect(() => {
    checkRestaurant();
  }, [location.pathname, dispatch]); // Added `dispatch` for stability

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      {/* Dynamic Header Based on Authentication */}
      {isRestaurantAuth ? <RestaurantHeader /> : <Header /> } 

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};
