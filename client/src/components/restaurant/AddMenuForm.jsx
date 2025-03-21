import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { CameraIcon } from "lucide-react";

export const AddMenuForm = ({ menuItem }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: menuItem?.name || "",
            description: menuItem?.description || "",
            price: menuItem?.price || "",
            category: menuItem?.category || "",
        },
    });
    

    // Debugging: Check if menuItem is received
    useEffect(() => {
        //console.log("Received menuItem:", menuItem);
    }, [menuItem]);

    useEffect(() => {
        if (menuItem) {
            console.log("Updating form fields with menuItem:", menuItem);
            reset({
                name: menuItem.name || "",
                description: menuItem.description || "",
                price: menuItem.price || "",
                category: menuItem.category || "",
            });
        }
    }, [menuItem, reset]);
    
    

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("category", data.category);
          

            if (data.image && data.image.length > 0) {
                formData.append("image", data.image[0]);
            }

            if (menuItem) {
                await axiosInstance.put(`/menu/updateMenu/${menuItem._id}`, formData);
                toast.success("Menu updated successfully");
            } else {
                await axiosInstance.post("/menu/add-menu", formData);
                toast.success("Menu created successfully");
            }

            navigate("/restaurant/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Error while submitting menu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6"
            >
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                    {menuItem ? "Update Menu Item" : "Add New Menu Item"}
                </h2>

                {/* Menu Item Name */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Menu Item Name</label>
                    <input
                        type="text"
                        placeholder="Enter menu item name"
                        className="input bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-green-500 rounded-lg p-3 mt-1"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
                </div>

                {/* Image Upload */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Upload Image</label>
                    <div className="relative w-full">
                        <input
                            type="file"
                            accept="image/*"
                            className="input bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-green-500 rounded-lg p-3 cursor-pointer mt-1"
                            {...register("image")}
                        />
                        <CameraIcon className="absolute right-3 top-3 text-gray-500" />
                    </div>
                </div>

                {/* Price */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Price (₹)</label>
                    <input
                        type="number"
                        placeholder="Enter price"
                        className="input bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-green-500 rounded-lg p-3 mt-1"
                        {...register("price", { required: "Price is required" })}
                    />
                    {errors.price && <span className="text-red-500 text-sm mt-1">{errors.price.message}</span>}
                </div>

                {/* Category Dropdown */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Category</label>
                    <select
                        className="input bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-green-500 rounded-lg p-3 mt-1"
                        {...register("category", { required: "Category is required" })}
                    >
                        <option value="">Select Category</option>
                        <option value="Starters">Starters</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Snack">Snack</option>
                    </select>
                    {errors.category && <span className="text-red-500 text-sm mt-1">{errors.category.message}</span>}
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium">Description</label>
                    <textarea
                        placeholder="Enter menu item description"
                        className="textarea bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-green-500 rounded-lg p-3 mt-1 h-24"
                        {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button 
                        type="submit" 
                        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition w-full md:w-1/2"
                    >
                        {loading ? <span className="loading loading-dots loading-lg"></span> : (menuItem ? "Update Menu" : "Add Menu")}
                    </button>
                </div>
            </form>
        </div>
    );
};
