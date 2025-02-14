import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu } from "lucide-react"; // Import Menu icon for mobile
import { DarkMode } from "../shared/DarkMode";
import { axiosInstance } from "../../config/AxiosInstance";
import { useNavigate } from "react-router-dom";

const UserHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false); // New state for mobile menu
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axiosInstance.get("/user/logout");
      // navigate('/login');
      navigate("/");
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden block focus:outline-none"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          <Menu className="w-8 h-8" />
        </button>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/menu" className="hover:underline">Menu</Link>
          <Link to="/signup" className="bg-white text-red-500 px-4 py-1 rounded-full hover:bg-gray-200 transition">
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
          
            {menuOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white text-gray-800 shadow-xl rounded-lg py-2 overflow-hidden">
                <Link to="/user/profile" className="block px-4 py-3 hover:bg-gray-200">Profile</Link>
                <Link to="/user/logout" className="block px-4 py-3 hover:bg-gray-200" onClick={handleLogOut}>Logout</Link>
              </div>
            )}
   
              <DarkMode />
              
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileNavOpen && (
        <nav className="md:hidden bg-green-700 text-white flex flex-col items-center space-y-4 py-4">
          <Link to="/" className="hover:underline" onClick={() => setMobileNavOpen(false)}>Home</Link>
          <Link to="/about" className="hover:underline" onClick={() => setMobileNavOpen(false)}>About</Link>
          <Link to="/menu" className="hover:underline" onClick={() => setMobileNavOpen(false)}>Menu</Link>
          <Link to="/signup" className="bg-white text-red-500 px-4 py-1 rounded-full hover:bg-gray-200 transition" onClick={() => setMobileNavOpen(false)}>
            Join Us
          </Link>
        </nav>
      )}
    </header>
  );
};

export default UserHeader;
