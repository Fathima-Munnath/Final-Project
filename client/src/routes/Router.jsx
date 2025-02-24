import { createBrowserRouter } from "react-router-dom";
import { UserLayout } from '../layout/UserLayout';
import { RestaurantLayout } from '../layout/RestaurantLayout';
import { ErrorPage } from '../pages/shared/ErrorPage';
import Home from '../pages/user/Home';
import { Signup } from '../pages/shared/signupPage';
import { Login } from '../pages/shared/LoginPage';
import Contact from '../pages/user/Contact';
import { Menu } from '../pages/user/Menu';
import { About } from "../pages/user/About";
import { MenuDetails } from '../pages/user/MenuDetails';
import { ProtectedRoute } from "./ProtectedRoute";
import { ProtectedRouteRestaurant } from "./ProtectedRouteRestaurant";
import { Profile } from '../pages/user/Profile';
import {AddMenu} from "../pages/restaurant/AddMenu";
import  {Dashboard}  from "../pages/restaurant/Dashboard";
import {RestaurantOrders} from "../pages/restaurant/RestaurantOrders";
import {RestaurantProfile}  from "../pages/restaurant/RestaurantProfile";
import {Cart} from "../pages/user/Cart";
import { PaymentSuccess} from "../pages/user/PaymentSuccess";


const data = {};

export const router = createBrowserRouter([

  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage role="user"/>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login role="user"/>,
      },

      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "menuDetails/:menuItemId",
        element: <MenuDetails />,
      },
      {
        element: <ProtectedRoute />,
        path: "user",
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "payment/success",
            element: <PaymentSuccess />,
          },
        ],
      },

    ],
  },
  {
    path: "restaurant",
    element: <RestaurantLayout />,
    errorElement: <ErrorPage role="restaurant" />,
    children: [
      {
        path: "login",
        element: <Login role="restaurant" />,
      },
      {
        path: "signup",
        element: <Signup role="restaurant" />,
      },
      {
        path: "",
        element: <ProtectedRouteRestaurant />,
        children: [
          {
            path: "dashboard",
            element:<Dashboard />
          },
          {
            path: "all-orders",
            element: <RestaurantOrders />
          },
          {
            path: "profile",
            element: <RestaurantProfile />
          },
          {
            path: "addMenu/:menuItemId?",
            element: <AddMenu />,
          },
        ],
      },
    ],
  },


]);
