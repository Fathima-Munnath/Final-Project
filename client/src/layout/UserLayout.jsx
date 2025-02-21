import React, { useEffect } from "react";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import { Outlet, useLocation } from "react-router-dom";
import {UserHeader} from "../components/user/UserHeader";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";

export const UserLayout = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const { isRestaurantAuth } = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();
  const location = useLocation();
  const checkUser = async () => {
    try {
        const response = await axiosInstance({
            method: "GET",
            url: "/user/check-user",
        });
        dispatch(saveUser())
    } catch (error) {
        dispatch(clearUser())
        console.log(error);
    }
};


useEffect(() => {
    checkUser();
}, [location.pathname]);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="shadow-md">
        {isUserAuth ? <UserHeader /> : <Header />}
      </header>


     
        <Outlet />
   

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};
