import React, { useState } from "react";
import { MenuCards } from "../../components/user/cards";
import { axiosInstance } from "../../config/axiosInstance";

function Home() {

  const [searchTerm, setSearchTerm] = useState("");
  const [menuResults, setMenuResults] = useState([]);

  // Function to handle search
  const handleSearch = async () => {
    try {
      const response = await axiosInstance.post("/menu/searchMenuItems", { searchContent: searchTerm });
console.log(response);
      // If no results, set an empty array
      if (response.data.data.length === 0) {
        setMenuResults([]);
        return;
      }

      setMenuResults(response.data.data); // Update menu results
    } catch (error) {
      console.error("Search failed:", error);
      setMenuResults([]); // Ensure old data is cleared if the search fails
    }
  };
  return (
    <div>

      <div className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>

        <div className="container mx-auto my-8">

          {/* Overlay for Better Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-800/0 to-teal-600/60"></div>

          {/* Content */}
          <div className="relative text-center text-white z-10 px-4">
            <h1 className="text-4xl font-extrabold mb-4">Fresh & Fast, Straight to Your Door!</h1>

            {/* Search Bar */}
            <div className="flex justify-center">

              <input
                type="text"
                placeholder="Search for restaurants or dishes..."
                className="w-80 md:w-96 px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-6 py-2 rounded-r-lg hover:bg-green-600 transition"
                onClick={handleSearch} // Call API on button click
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        Explore Popular Categories
      </h2>
      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
        {[
          { name: "Pizza", img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
          { name: "Burger", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
          { name: "Rice", img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/paneer-fried-rice.webp" },
          { name: "Desserts", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
          { name: "Pasta", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
        ].map((item, index) => (
          <div key={index} className="text-center">
            <img
              src={item.img}
              alt={item.name}
              className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full object-cover shadow-lg transition-transform transform hover:scale-105"
            />
            <p className="mt-3 text-lg font-semibold text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>
      {menuResults.length > 0 ? (
        <div className="min-h-screen bg-base-100 flex flex-col items-center py-10 px-4">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Search Results</h2>
          <section className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {menuResults.map((menuItem, index) => (
              <MenuCards key={menuItem?._id} menuItem={menuItem} />
            ))}
          </section>
        </div>
      ) : searchTerm && (
        <p className="text-center text-gray-500 font-semibold mt-6">No results found for "{searchTerm}"</p>
      )}

    </div>

  );
}

export default Home;
