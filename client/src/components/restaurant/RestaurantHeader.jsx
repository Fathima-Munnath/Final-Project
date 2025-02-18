import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/AxiosInstance";
//import { Link } from "react-router-dom";

export const RestaurantHeader = () => {
  const navigate = useNavigate();
  //const [mobileNavOpen, setMobileNavOpen] = useState(false); 

  const handleLogOut = async () => {
      try {
        await axiosInstance.get("/restaurant/logout");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
  

  return (

    // <header className="bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg sticky top-0 w-full z-50">
    // <div className="container mx-auto flex justify-between items-center p-5">
    //   {/* Logo */}
    //   <Link to="/" className="text-3xl font-extrabold tracking-wide">
    //     🍔 FoodieHub
    //   </Link>

    //   {/* Mobile Menu Button */}
    //   <button
    //     className="md:hidden block focus:outline-none"
    //     onClick={() => setMobileNavOpen(!mobileNavOpen)}
    //   >
    //     <Menu className="w-8 h-8" />
    //   </button>

    //     {/* Navigation (Desktop) */}
    //     <nav className="hidden md:flex space-x-8 text-lg font-medium">
    //       <Link to="/restaurant/dashboard" className="hover:underline">Dashboard</Link>
    //       <Link to="/restaurant/orders" className="hover:underline">Orders</Link>
    //       <Link to="/restaurant/addMenu" className="hover:underline">Add Menu</Link>
    //       <Link to="//restaurant/profile" className="hover:underline">Profile</Link>
    //     </nav>
    //     {mobileNavOpen && (
    //       <nav className="md:hidden bg-green-700 text-white flex flex-col items-center space-y-4 py-4">
    //         <Link to="/restaurant/dashboard" className="hover:underline" onClick={() => setMobileNavOpen(false)}>Home</Link>
    //         <Link to="/restaurant/orders" className="hover:underline" onClick={() => setMobileNavOpen(false)}>About</Link>
    //         <Link to="/restaurant/addMenu" className="hover:underline" onClick={() => setMobileNavOpen(false)}>Menu</Link>
    //         <Link to="//restaurant/profile" className="hover:underline" onClick={() => setMobileNavOpen(false)}>Profile</Link>
    //       </nav>
    //     )}
    //     </div>
    // </header>


      <div className="navbar-start bg-gradient-to-r from-green-600 to-teal-600  w-full ">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-lg shadow-md mt-3 w-52 p-2 z-[1]">
            <li><a onClick={() => navigate("/restaurant/dashboard")}>Dashboard</a></li>
            <li><a onClick={() => navigate("/restaurant/orders")}>Orders</a></li>
            <li><a onClick={() => navigate("/restaurant/addMenu")}>Add Menu</a></li>
            <li><a onClick={() => navigate("/restaurant/profile")}>Profile</a></li>
            <li><a onClick={handleLogOut}>Logout</a></li>
          </ul>
        </div>
      
      {/* Center - Logo */}
      <div className="navbar-center text-2xl font-bold text-white cursor-pointer hover:text-green-700 transition align-center">
        
   🍔 FoodieHub
        
      </div>
      
    </div> 
  );
};
