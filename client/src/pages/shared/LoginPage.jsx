import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../../redux/features/userSlice";
import { saveRestaurant, clearRestaurant } from "../../redux/features/restaurantSlice";
import toast from "react-hot-toast";

export const Login = ({ role }) => {
    const { register, handleSubmit } = useForm({ mode: "onSubmit" }); // Ensure correct form behavior
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = role === "restaurant"
        ? {
            role: "restaurant",
            loginAPI: "/restaurant/login",
            profileRoute: "/restaurant/profile",
            signupRoute: "/restaurant/signup",
            homeRoute: "/restaurant/dashboard",
        }
        : {
            role: "user",
            loginAPI: "/user/login",
            profileRoute: "/user/profile",
            signupRoute: "/signup",
            homeRoute: "/",
        };

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance({
                method: "PUT", // Fixed from PUT to POST
                url: user.loginAPI,
                data,
            });

            console.log("Response:", response);

            if (response?.data?.data) {
                if (role == "restaurant") {
                    dispatch(saveRestaurant(response?.data.data));
                }
                else {
                    dispatch(saveUser(response?.data.data));
                }
                toast.success("Login successful");
                navigate(user.homeRoute);
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            if (role == "restaurant")
                dispatch(clearRestaurant());
            else
                dispatch(clearUser());
            toast.error("Login failed. Please check your credentials.");
            console.error("Login Error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-4">Login now! ({user.role})</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", { required: true })}
                            className="input input-bordered w-full mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                            className="input input-bordered w-full mt-1"
                        />
                    </div>
                    <div className="text-sm text-gray-600 flex justify-between mb-4">
                        {/* Provide a real route for forgot password */}
                        <Link to="/forgot-password" className="hover:underline">
                            Forgot password?
                        </Link>
                        <Link to={user.signupRoute} className="hover:underline">
                            New User? Sign up
                        </Link>
                    </div>
                    <button className="btn btn-primary w-full">Login</button>
                </form>
            </div>
        </div>
    );
};
