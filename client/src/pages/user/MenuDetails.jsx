import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

export const MenuDetails = () => {
    const params = useParams();
    const { menuItemId } = params;

    console.log("params===",  menuItemId );
    

    const [menuDetails, setMenuDetails] = useState({});

    const fetchCourses = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: `/menu/MenuDetails/${menuItemId}`,
            });
            console.log("response====", response);
            setMenuDetails(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
      if (menuItemId) {
          fetchCourses();
      }
  }, [menuItemId]);
  
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
      </section>
  </div>
  
    );
};