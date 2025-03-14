import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/UseFetch";
import { CartCards } from "../../components/user/cards";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";

export const Cart = () => {
    const navigate = useNavigate();
    const [refreshState, setRefreshState] = useState(false);
    const [cartDetails, isLoading, error] = useFetch("/cart/get-cart", refreshState);
    const [addressList] = useFetch("/address/get-address");
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        if (addressList?.length > 0) {
            setSelectedAddress(addressList[0]._id); // Default to first address
        }
    }, [addressList]);

    const handleAddressSelect = (addressId) => {
        setSelectedAddress(addressId);
    };

    const makePayment = async () => {
        try {
            if (!cartDetails?.items || cartDetails?.items?.length === 0) {
                toast.error("Your cart is empty!");
                return;
            }
    
            if (!selectedAddress) {
                toast.error("Please select a delivery address!");
                return;
            }
    
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
            const session = await axiosInstance.post("/payment/create-checkout-session", {
                products: cartDetails?.items,
                addressId: selectedAddress,
            });
    
            if (!session?.data?.sessionId) {
                throw new Error("Invalid session response from server.");
            }
    
            await stripe.redirectToCheckout({ sessionId: session.data.sessionId });
    
            // Redirect to success page after payment
            navigate("/payment-success");
    
        } catch (error) {
            console.error(error);
            toast.error("Payment failed. Please try again.");
        }
    };
    
    const handleRemoveCartItem = async (menuItemId) => {
        try {
            await axiosInstance.delete(`/cart/deleteCart/${menuItemId}`);
            toast.success("Menu item removed");
            setRefreshState((prev) => !prev);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to remove");
        }
    };
    const handleQuantityChange = async (menuItemId, newQuantity) => {
        if (newQuantity < 1) return;
    
        try {
            await axiosInstance.put("/cart/updateCart", {
                menuItemId,
                quantity: newQuantity,
            });
            toast.success("Quantity updated");
            setRefreshState((prev) => !prev);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update quantity");
        }
    };
    

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">My Cart</h1>
            
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cart Items Section */}
                <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold border-b pb-4 mb-4">Items in Cart</h2>
                    {cartDetails?.items?.length > 0 ? (
                        cartDetails.items.map((value) => (
                            <CartCards items={value} key={value?._id} handleRemove={handleRemoveCartItem} handleQuantityChange={handleQuantityChange} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">Your cart is empty.</p>
                    )}
                </div>

                {/* Address & Payment Section */}
                <div className="bg-green-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-green-700 font-semibold border-b pb-2 mb-2">Select Delivery Address</h2>

                    {addressList?.length > 0 ? (
                        <div className="space-y-3">
                            {addressList.map((addr) => (
                                <div 
                                    key={addr._id}
                                    className={`p-3 border rounded-md cursor-pointer ${
                                        selectedAddress === addr._id ? "border-green-500 bg-green-200" : "border-gray-300"
                                    }`}
                                    onClick={() => handleAddressSelect(addr._id)}
                                >
                                    <h3 className="font-semibold">{addr.houseName}</h3>
                                    <p className="text-sm">{addr.city}, {addr.state}, {addr.postalCode}</p>
                                    <p className="text-sm">Landmark: {addr.landmark} | Mobile: {addr.mobile}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 text-xs text-center">
                            <p>No address found. Go to Profile to add an address.</p>
                            <button 
                                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                                onClick={() => navigate("/user/profile")}
                            >
                                Go to Profile
                            </button>
                        </div>
                    )}

                    <h2 className="text-xl font-semibold border-b pb-4 mb-4 mt-4">Order Summary</h2>
                    {cartDetails?.items?.map((value) => (
                        <p key={value._id} className="text-gray-700 flex justify-between">
                            {value.menuItemId?.name} <span className="font-semibold">₹{value?.menuItemId?.price} </span>
                        </p>
                    ))}
                    <div className="border-t mt-4 pt-4 text-lg font-bold">
                        Total Price: ₹{cartDetails?.totalPrice}
                    </div>

                    <button
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded-lg transition duration-200"
                        onClick={makePayment}
                    >
                        Proceed to Payment
                    </button>
                </div>
            </section>
        </div>
    );
};
