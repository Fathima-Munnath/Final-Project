import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

export const Signup = ({ role = "user" }) => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response;
      console.log(data);
      
      if (role == "restaurant") {
        response = await axiosInstance.post("/restaurant/signup", data);
        navigate("/restaurant/dashboard");
      }
      else {
        response = await axiosInstance.post("/user/signup", data);
        navigate("/user/profile");
      }
      console.log("Signup Success:", response);
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-700">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">
            {role === "user" ? 
              "Sign up to order your favorite food! " :
              "Sign up to manage your restaurant!"}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Mobile</label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
          </div>
          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
          </div>

          {/* Signup Button */}
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Sign Up
          </button>

          {/* Login Redirect */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to={role === "restaurant" ? "/restaurant/login" : "/login"} className="text-green-500 font-semibold hover:underline" >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
