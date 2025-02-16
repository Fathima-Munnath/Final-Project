import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
        {/* Services */}
        <nav>
          <h6 className="text-lg font-semibold text-red-500 mb-3">Our Services</h6>
          <a className="block text-gray-300 hover:text-white" href="#">Food Delivery</a>
          <a className="block text-gray-300 hover:text-white" href="#">Catering</a>
          <a className="block text-gray-300 hover:text-white" href="#">Bulk Orders</a>
          <a className="block text-gray-300 hover:text-white" href="#">Subscription Plans</a>
        </nav>

        {/* Company */}
        <nav>
          <h6 className="text-lg font-semibold text-red-500 mb-3">Company</h6>
          <Link to="/about" className="block text-gray-300 hover:text-white">About Us</Link>
          <Link to="/contact" className="block text-gray-300 hover:text-white">Contact</Link>
          <Link to="/careers" className="block text-gray-300 hover:text-white">Careers</Link>
          <Link to="/blog" className="block text-gray-300 hover:text-white">Blog</Link>
        </nav>

        {/* Legal */}
        <nav>
          <h6 className="text-lg font-semibold text-red-500 mb-3">Restaurant</h6>
          <Link to="/restaurant/signup" className="block text-gray-300 hover:text-white"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Partner With Us</Link>
          <Link to="/restaurant/login" className="block text-gray-300 hover:text-white"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Restaurant Login</Link>
          <Link to="/cookies" className="block text-gray-300 hover:text-white">Restaurants</Link>
        </nav>

        {/* Newsletter */}
        <div>
          <h6 className="text-lg font-semibold text-red-500 mb-3">Stay Updated</h6>
          <p className="text-gray-400 text-sm mb-3">Subscribe to our newsletter for the latest updates and offers.</p>
          <div className="flex items-center bg-white rounded-lg overflow-hidden">
            <input type="email" placeholder="Enter your email" className="p-2 flex-grow text-gray-800 outline-none" />
            <button className="bg-red-500 px-4 py-2 text-white font-semibold">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} FoodieHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
