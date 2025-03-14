import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const clearCart = async () => {
            try {
                await axiosInstance.delete("/cart/clearCart"); // Call API to clear cart
                toast.success("Cart cleared successfully!");
            } catch (error) {
                toast.error("Failed to clear cart.");
            }
        };

        clearCart();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
                <p className="text-gray-700 mt-2">Thank you for your purchase.</p>
                <button 
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => navigate("/")}
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};
