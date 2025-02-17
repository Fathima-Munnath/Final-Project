import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/UseFetch";
import { MenuSkelton } from "../../components/shared/Skeltons";
import { MenuCards } from "../../components/user/cards";


export const Menu = () => {
  const [menuList, isLoading, error] = useFetch("/menu/getMenu");
  // const [menuList, setMenuList] = useState([]);
  // const fetchMenu = async () => {
  //   try {
  //     const response = await axiosInstance({
  //       method: "GET",
  //       url: "/menu/getMenu",
  //     });

  //     console.log("response===", response);

  //     // Correctly updating the state inside the function
  //     setMenuList(response?.data?.data || []);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchMenu();
  // }, []);

  return (
    <div>
      {isLoading ? (
        <MenuSkelton />
      ) : (
        <div className="min-h-screen bg-base-100 flex flex-col items-center py-10 px-4">
          <section className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {menuList?.map((menuItem, index) => (
              <MenuCards key={menuItem?._id} menuItem={menuItem} />
            ))}
          </section>
        </div>
      )}
    </div>
  );
};
