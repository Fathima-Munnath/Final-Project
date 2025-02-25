import React, { useState,useEffect } from "react";
import { useFetch } from "../../hooks/UseFetch";
import { axiosInstance } from "../../config/axiosInstance";

export const RestaurantOrders = () => {
  const [refreshState, setRefreshState] = useState(false);
  const [AllOrders, loading, error, setData] = useFetch("/order/get-all-orders",refreshState);
  const [activeTab, setActiveTab] = useState("Pending");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(AllOrders); // Sync local state with fetched data
  }, [AllOrders]);
   
  
  const handleDispatch = async (orderId) => {
    try {
      const response = await axiosInstance.patch(`/order/update-status/${orderId}`, {
        status: "Dispatched",
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Dispatched" } : order
        )
      );
      setRefreshState((prev) => !prev);
    } catch (error) {
      console.error("Error dispatching order:", error.response?.data || error.message);
    }
  };
  const handleCancel = async (orderId) => {
    try {
      const response = await axiosInstance.patch(`/order/update-status/${orderId}`, {
        status: "Cancelled",
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
      setRefreshState((prev) => !prev);
    
    } catch (error) {
      console.error("Error cancelling order:", error.response?.data || error.message);
    }
  };
  const pendingOrders = AllOrders?.filter(order => order.status === "Pending") || [];
  const dispatchedOrders = AllOrders?.filter(order => order.status === "Dispatched") || [];
  const cancelledOrders = AllOrders?.filter(order => order.status === "Cancelled") || [];

  const renderOrders = (orders) => (
    orders.map((order) => (
      <div
        key={order._id}
        className="bg-white rounded-lg shadow-md p-4 border border-green-300 flex flex-col md:flex-row items-start md:items-center text-sm relative"
      >
        <div className="flex-1">
          <h2 className="text-md font-bold text-green-800">Order ID: {order._id}</h2>
          <p className="text-xs text-gray-500">
            Status:
            <span className={`font-semibold ${order.status === "Pending" ? "text-yellow-500" :
                order.status === "Dispatched" ? "text-green-600" :
                  order.status === "Cancelled" ? "text-red-600" : "text-gray-500"
              }`}>
              {order.status}
            </span>
          </p>
          <p className="text-sm font-semibold text-green-700">Total: ₹{(order.totalAmount / 100).toFixed(2)}</p>
          <p className="text-xs text-gray-500">Date: {new Date(order.orderDate).toLocaleString()}</p>
          <h3 className="mt-1 text-sm font-semibold text-green-800">Restaurant: {order.restaurantId.name}</h3>
          <div className="mt-1 p-2 bg-green-100 rounded-md border border-green-300 w-full md:w-2/3">
            <p className="text-xs text-gray-500">Customer: <span className="font-semibold text-green-800">{order.userId.name}</span> ({order.userId.email})</p>
            {order.addressId ? (
                  <p className="text-xs text-green-700 font-medium">
                    {order.addressId.houseName}, {order.addressId.city}, {order.addressId.postalCode}, {order.addressId.state}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">No address provided</p>
                )}
                {order.addressId && (
                  <p className="text-xs text-green-700 font-medium">
                    Landmark: {order.addressId.landmark} | Contact:  {order.addressId.mobile}
                  </p>
                )}
          </div>
        </div>
        <div className="w-full md:w-1/4 mt-3 md:mt-0 flex flex-col items-center">
          <details className="bg-green-100 p-3 rounded-lg cursor-pointer w-full">
            <summary className="font-semibold text-green-700 text-xs">View Items</summary>
            <ul className="mt-1 space-y-1">
              {order.items.map((item) => (
                <li key={item._id} className="p-1 border-b border-green-300 flex items-center space-x-2">
                  <img src={item.menuItemId.image} alt={item.menuItemId.name} className="w-8 h-8 rounded-lg object-cover" />
                  <div>
                    <span className="text-green-800 font-medium text-xs">{item.menuItemId.name}</span> -
                    <span className="text-green-600 font-semibold text-xs">₹{item.price}</span> x {item.quantity}
                  </div>
                </li>
              ))}
            </ul>
          </details>
          {order.status === "Pending" && (
            <div>
              <button
                onClick={() => handleDispatch(order._id)}
                className="mt-2 px-4 py-2 text-xs font-bold rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Dispatch
              </button>
              <button
                onClick={() => handleCancel(order._id)}
                className="mt-2 ml-2 px-4 py-2 text-xs font-bold rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Cancel Order
              </button>
            </div>
          )}
        </div>
      </div>
    ))
  );

  return (
    <div className="container mx-auto p-4 bg-green-50">
      <div className="flex space-x-4 mb-4 border-b-2 pb-2">
        {["Pending", "Dispatched", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 font-bold ${activeTab === status ? "border-b-2 border-green-600 text-green-700" : "text-gray-500"}`}
          >
            {status}
          </button>
        ))}
      </div>

      {activeTab === "Pending" && (pendingOrders.length > 0 ? renderOrders(pendingOrders) : <p className="text-green-500 text-center text-sm">No Orders Available.</p>)}
      {activeTab === "Dispatched" && (dispatchedOrders.length > 0 ? renderOrders(dispatchedOrders) : <p className="text-green-500 text-center text-sm">No Dispatched Orders.</p>)}
      {activeTab === "Cancelled" && (cancelledOrders.length > 0 ? renderOrders(cancelledOrders) : <p className="text-green-500 text-center text-sm">No Cancelled Orders.</p>)}
    </div>
  );
};
