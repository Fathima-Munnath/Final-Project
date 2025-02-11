import { createBrowserRouter } from "react-router-dom";
import { UserLayout } from '../layout/UserLayout';
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
import AddMenu from "../pages/restaurant/AddMenu";

const data = {};

export const router = createBrowserRouter([

  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
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
        element: <Login />,
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
            // element: <Cart />,
          },
          {
            path: "orders",
            // element: <h1> orders page</h1>,
          },
          {
            path: "payment/success",
            // element: <h2>Payment success</h2>,
          },
        ],
      },

    ],
  },
  {
    path: "restaurant",
    element: <restaurantLayout />,
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
          },
          {
            path: "all-menuItems",
          },
          {
            path: "profile",
            element: <h1> Restaurant Profile page</h1>
          },
          {
            path: "addMenu",
            element: <AddMenu />,
          },
        ],
      },
    ],
  },


]);
