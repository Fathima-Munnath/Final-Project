import React from "react";
import { useFetch } from "../../hooks/UseFetch";
import { useLocation } from "react-router-dom";

function Orders() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const session_id = queryParams.get("session_id");

  const [orderList, loading, error] = useFetch(`/payment/session-status?session_id=${session_id}`);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Order Details</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading order details...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : orderList ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <p><strong>Status:</strong> {orderList.status}</p>
          <p><strong>Customer Email:</strong> {orderList.customer_email || "N/A"}</p>
          <p><strong>Session ID:</strong> {orderList.session_data.id}</p>
          <p><strong>Payment Mode:</strong> {orderList.session_data.payment_method_types?.[0]}</p>
          <p><strong>Amount Paid:</strong> ₹{(orderList.session_data.amount_total / 100).toFixed(2)}</p>
          <p><strong>Currency:</strong> {orderList.session_data.currency.toUpperCase()}</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">No order details found.</p>
      )}
    </div>
  );
}

export default Orders;
