import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { AddMenuForm } from "./AddMenuForm";
import toast from "react-hot-toast";

export const UpdateMenu = () => {
    const { id } = useParams(); // Get menu item ID from URL
    const [menuItem, setMenuItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuItem = async () => {
            try {
                const response = await axiosInstance.get(`/menu/get-restaurant-menu-item/${id}`);
                setMenuItem(response.data.data);
            } catch (error) {
                toast.error("Failed to fetch menu details");
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItem();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <AddMenuForm menuItem={menuItem} />
        </div>
    );
};
