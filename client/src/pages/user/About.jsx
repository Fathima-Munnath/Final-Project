import React, { useState } from "react";

export const About = () => {
  const [activeTab, setActiveTab] = useState("story");

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar Tabs */}
      <div className="w-1/4 bg-white shadow-xl p-6 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">About Us</h2>
        <ul className="space-y-4">
          {["story", "mission", "team", "contact"].map((tab) => (
            <li
              key={tab}
              className={`p-4 cursor-pointer rounded-lg text-lg font-semibold ${
                activeTab === tab ? "bg-green-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "story" ? "Our Story" :
                tab === "mission" ? "Mission & Vision" :
                tab === "team" ? "Our Team" : "Contact Us"}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-12 text-gray-800">
        {activeTab === "story" && (
          <>
            <h1 className="text-4xl font-bold mb-6">Our Story</h1>
            <p className="text-lg leading-relaxed">
              FoodExpress started with a vision to connect food lovers with the best restaurants. 
              We bring convenience, quality, and taste to your doorstep.
            </p>
          </>
        )}

        {activeTab === "mission" && (
          <>
            <h1 className="text-4xl font-bold mb-6">Mission & Vision</h1>
            <p className="text-lg leading-relaxed">
              Our mission is to provide fresh, high-quality meals while supporting local businesses. 
              We aim to make food delivery seamless and enjoyable.
            </p>
          </>
        )}

        {activeTab === "team" && (
          <>
            <h1 className="text-4xl font-bold mb-6">Our Team</h1>
            <p className="text-lg leading-relaxed">
              Meet our passionate team of chefs, food enthusiasts, and technology experts 
              who work together to deliver the best food experience.
            </p>
          </>
        )}

        {activeTab === "contact" && (
          <>
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg leading-relaxed">
              Have any questions or feedback? Reach out to us at 
              <strong> support@foodexpress.com</strong> or call us at <strong>+91 98765 43210</strong>.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
