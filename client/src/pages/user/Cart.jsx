import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/UseFetch";
import { CartCards } from "../../components/user/Cards";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/AxiosInstance";
import { loadStripe } from "@stripe/stripe-js";

export const Cart = () => {
    const [refreshState, setRefreshState] = useState(false);

    const [cartDetails, isLoading, error] = useFetch("/cart/get-cart", refreshState);
   

    console.log(cartDetails);
    
    const makePayment = async () => {
      try {
          if (!cartDetails?.items || cartDetails?.items?.length === 0) {
              toast.error("Your cart is empty!");
              return;
          }
  
          const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);
  
          const session = await axiosInstance.post("/payment/create-checkout-session", {
              products: cartDetails?.items,
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
            // const response = await axiosInstance({
            //     method: "DELETE",
            //     url: `/cart/deleteCart/${menuItemId}`,
            // });
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
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
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