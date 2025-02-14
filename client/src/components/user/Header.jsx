import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";

const Header = () => {
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
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="restaurant/login" className="hover:underline">Restaurant Login</Link>
          <Link to="/signup" className="bg-white text-green-600 px-4 py-1 rounded-full hover:bg-gray-200 transition">
            Join Us
          </Link>
        </nav>

        {/* Dark Mode Toggle */}
        <div className="flex items-center gap-3">
          <DarkMode />
        </div>
      </div>
    </header>
  );
};

export default Header;
