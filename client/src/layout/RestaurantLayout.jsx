import React, { useEffect } from "react";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { RestaurantHeader } from "../components/restaurant/RestaurantHeader";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { clearRestaurant, saveRestaurant } from "../redux/features/restaurantSlice";

export const RestaurantLayout = () => {
  const { isRestaurantAuth } = useSelector((state) => state.restaurant); // Ensure correct slice
  const dispatch = useDispatch();
  const location = useLocation();
   const checkRestaurant = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: "/restaurant/check-restaurant",
            });
            dispatch(saveRestaurant())
        } catch (error) {
            dispatch(clearRestaurant())
            console.log(error);
        }
    };


    useEffect(() => {
      checkRestaurant ();
    }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
     
      <header className="shadow-md">
      {isRestaurantAuth ? <RestaurantHeader /> : <Header /> } 
      </header>

        <Outlet />

      {/* Footer Section */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};
