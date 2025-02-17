import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/AxiosInstance";
import toast from "react-hot-toast";

export const MenuDetails = () => {
    const params = useParams();
    const { menuItemId } = params;

    const [menuDetails, setMenuDetails] = useState({});

    const fetchMenuDetails = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: `/menu/MenuDetails/${menuItemId}`,
            });
            setMenuDetails(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (menuItemId) {
            fetchMenuDetails();
        }
    }, [menuItemId]);

    const addToCart = async () => {
        try {
            console.log(menuItemId);
            let quantity = 1;
            const response = await axiosInstance({
                method: "POST",
                url: "/cart/add-to-cart",
                data: {  menuItemId, quantity },
            });
            console.log(response);
            toast.success("Menu added to cart");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <section className="mb-6">
                <h2 className="text-4xl font-extrabold text-gray-900">Menu Details</h2>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full text-center">
                <img 
                    src={menuDetails?.image} 
                    alt={menuDetails?.name} 
                    className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{menuDetails?.name}</h2>
                <p className="text-lg text-gray-600">{menuDetails?.description}</p>
                <button
                    type="button"
                    className="px-3 py-2 w-1/2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300"
                    onClick={addToCart}
                >
                    Add to Cart
                </button>
            </section>
        </div>
    );
};
