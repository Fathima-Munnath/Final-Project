import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { DarkMode } from "../shared/DarkMode";
import { axiosInstance } from "../../config/axiosInstance";



const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogOut = async () => {
          try {
              const response = await axiosInstance({
                  method: "GET",
                  url: "/user/logout",
              });
              //navigate('/login');
          } catch (error) {
              console.log(error);
          }
      };

  return (
    <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg sticky top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-5">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold tracking-wide">
          🍔 FoodieHub
        </Link>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/menu" className="hover:underline">Menu</Link>
          <Link to="/signup" className="bg-white text-red-500 px-4 py-1 rounded-full hover:bg-gray-200 transition" onClick= {()=>navigate('/signup')} >
            Join Us
          </Link>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-7 h-7" />
            <span className="absolute -top-2 -right-2 bg-white text-red-500 text-xs px-2 py-0.5 rounded-full font-bold shadow-md">
              3
            </span>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              <User className="w-7 h-7" />
            </button>
            <DarkMode />
            {menuOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white text-gray-800 shadow-xl rounded-lg py-2 overflow-hidden">
                <Link to="/user/profile" className="block px-4 py-3 hover:bg-gray-200">Profile</Link>
                <Link to="/logout" className="block px-4 py-3 hover:bg-gray-200" onClick= {handleLogOut}>Logout</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
