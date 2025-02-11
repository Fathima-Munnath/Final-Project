import React, { useState } from "react";

export const About = () => {
  const [activeTab, setActiveTab] = useState("story");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar / Tabs */}
      <div className="lg:w-1/4 w-full bg-white shadow-md p-4 lg:p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center lg:text-left mb-4 lg:mb-6">About Us</h2>
        
        <ul className="flex lg:flex-col flex-wrap justify-center lg:space-y-4 space-x-2 lg:space-x-0">
          {["story", "mission", "team", "contact"].map((tab) => (
            <li
              key={tab}
              className={`p-3 lg:p-4 cursor-pointer rounded-lg text-center lg:text-left text-lg font-semibold transition-all
              ${activeTab === tab ? "bg-green-500 text-white" : "hover:bg-gray-200 text-gray-700"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "story" ? "Our Story" :
                tab === "mission" ? "Mission & Vision" :
                tab === "team" ? "Our Team" : "Contact Us"}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Section */}
      <div className="lg:w-3/4 w-full p-6 lg:p-12 text-gray-800">
        {activeTab === "story" && (
          <>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">Our Story</h1>
            <p className="text-base lg:text-lg leading-relaxed">
              FoodExpress started with a vision to connect food lovers with the best restaurants. 
              We bring convenience, quality, and taste to your doorstep.
            </p>
          </>
        )}

        {activeTab === "mission" && (
          <>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">Mission & Vision</h1>
            <p className="text-base lg:text-lg leading-relaxed">
              Our mission is to provide fresh, high-quality meals while supporting local businesses. 
              We aim to make food delivery seamless and enjoyable.
            </p>
          </>
        )}

        {activeTab === "team" && (
          <>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">Our Team</h1>
            <p className="text-base lg:text-lg leading-relaxed">
              Meet our passionate team of chefs, food enthusiasts, and technology experts 
              who work together to deliver the best food experience.
            </p>
          </>
        )}

        {activeTab === "contact" && (
          <>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">Contact Us</h1>
            <p className="text-base lg:text-lg leading-relaxed">
              Have any questions or feedback? Reach out to us at 
              <strong> support@foodexpress.com</strong> or call us at <strong>+91 98765 43210</strong>.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
