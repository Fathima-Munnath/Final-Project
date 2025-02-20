import React from 'react'
import { useFetch } from "../../hooks/UseFetch";
import { MenuCards } from "../../components/restaurant/Card";
import { MenuSkelton } from "../../components/shared/Skeltons";


export const Dashboard = () => {
  const [meuItems,isLoading,error]=useFetch("/menu/get-restaurant-menu-items")
  //console.log("restaurant menu===",meuItems);
  return (
    <div>
          {isLoading ? (
            <MenuSkelton />
          ) : (
            <div className="min-h-screen bg-base-100 flex flex-col items-center py-10 px-4">
              <section className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                {meuItems?.map((menuItem, index) => (
                  <MenuCards key={menuItem?._id} menuItem={menuItem} />
                ))}
              </section>
            </div>
          )}
        </div>
      );
    };
    
  


