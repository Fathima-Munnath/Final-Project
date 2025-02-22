import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/UseFetch";
import { CartCards } from "../../components/user/cards";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";

export const Cart = () => {
    const [refreshState, setRefreshState] = useState(false);
    const [cartDetails, isLoading, error] = useFetch("/cart/get-cart", refreshState);
    const [getAddress] = useFetch("/address/get-address");
    console.log("address===", getAddress);

    const makePayment = async () => {
        try {
            if (!cartDetails?.items || cartDetails?.items?.length === 0) {
                toast.error("Your cart is empty!");
                return;
            }

            if (!getAddress?.[0]?._id) {
                toast.error("Please select an address before proceeding.");
                return;
            }

            const addressId = getAddress?.[0]?._id;

            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
            const session = await axiosInstance.post("/payment/create-checkout-session", {
                products: cartDetails?.items,
                addressId,
            });

            if (!session?.data?.sessionId) {
                throw new Error("Invalid session response from server.");
            }

            await stripe.redirectToCheckout({ sessionId: session.data.sessionId });
        } catch (error) {
            console.error(error);
            toast.error("Payment failed. Please try again.");
        }
    };

    const handleRemoveCartItem = async (menuItemId) => {
        try {
            console.log(menuItemId);
            const response = await axiosInstance.delete(`/cart/deleteCart/${menuItemId}`);

            toast.success("Menu item removed ");
            setRefreshState((prev) => !prev);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "failed to remove");
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
                            <CartCards items={value} key={value?._id} handleRemove={handleRemoveCartItem} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">Your cart is empty.</p>
                    )}
                </div>

                {/* Summary & Payment Section */}
                <div className="bg-green-100 p-6 rounded-lg shadow-md">
                    {/* Address Section */}
                    <div className="mb-4 text-sm ">
                        <h2 className="text-green-700 font-semibold border-b pb-2 mb-2 text-xs">Delivery Address</h2>
                        {getAddress?.length > 0 ? (
                            <div className="text-gray-700 text-xs">
                                <p className="font-semibold">{getAddress[0]?.user?._id}</p>
                                <p>{getAddress[0]?.houseName},{getAddress[0]?.city}, {getAddress[0]?.state}, PIN: {getAddress[0]?.postalCode}</p>
                                <p>land Mark:{getAddress[0]?.landmark} | Contact: {getAddress[0]?.mobile}</p>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-xs">No address found. Please add an address.</p>
                        )}
                    </div>

                    <h2 className="text-xl font-semibold border-b pb-4 mb-4">Order Summary</h2>
                    {cartDetails?.items?.map((value) => (
                        <p key={value._id} className="text-gray-700 flex justify-between">
                            {value.menuItemId?.name} <span className="font-semibold">₹{value?.menuItemId?.price}</span>
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
