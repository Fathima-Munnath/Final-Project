import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { AddMenuForm } from "../../components/restaurant/AddMenuForm";

export const AddMenu = () => {
    const { menuItemId } = useParams(); // Get menu ID from URL
    const [menuItem, setMenuItem] = useState(null);

    useEffect(() => {
        if (menuItemId) {
            axiosInstance.get(`/menu/MenuDetails/${menuItemId}`)
                .then(response => {
                    setMenuItem(response.data); // Set menu item
                })
                .catch(error => console.error("Error fetching menu item", error));
        }
    }, [menuItemId]);

    return (
        <main className="container mx-auto px-2">
            <section className="my-8 lg:w-3/4 mx-auto px-1">
                <AddMenuForm menuItem={menuItem} />
            </section>
        </main>
    );
};
