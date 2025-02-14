import React, { useEffect } from "react";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import { Outlet, useLocation } from "react-router-dom";
import UserHeader from "../components/user/UserHeader";
import { axiosInstance } from "../config/AxiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";

export const UserLayout = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  console.log("isUserAuth====", isUserAuth);

  const checkUser = async () => {
    try {
      const response = await axiosInstance.get("/user/check-user");
      dispatch(saveUser(response.data)); // Ensure proper user data is saved
    } catch (error) {
      dispatch(clearUser());
      console.error("User authentication failed:", error);
    }
  };
  //console.log('pathname===', location.pathname)

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
