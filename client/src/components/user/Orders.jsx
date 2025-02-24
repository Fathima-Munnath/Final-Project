import React from "react";
import { useFetch } from "../../hooks/UseFetch"; 

export const Orders = () => {
  const [orderList, loading, error] = useFetch("/order/get-orders");
  
  return (
    <div className="container mx-auto p-4">
    {orderList?.length > 0 ? (
      <div className="space-y-4">
        {orderList.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-4 border border-green-300 flex flex-col md:flex-row items-start md:items-center text-sm">
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
              <div className="mt-1 p-2 bg-green-100 rounded-md border border-green-300 w-full md:w-2/3">
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
            <div className="w-full md:w-1/4 mt-3 md:mt-0">
              <details className="bg-green-100 p-3 rounded-lg cursor-pointer">
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
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-green-500 text-center text-sm">No Orders Available.</p>
    )}
  </div>
  );
};
