import React from "react";
import { AddMenuForm } from "../../components/restaurant/AddMenuForm";

export const AddMenu = () => {
    return (
        <main className="container mx-auto px-2">
            <section className="my-8 lg:w-3/4 mx-auto px-1">
                <h2 className="font-semibold text-center text-2xl my-5 underline">Add new Menu</h2>
                <AddMenuForm />
            </section>
        </main>
    );
};