import "./App.css";
import Home from "./screens/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainSection from "./screens/MainSection";
import {
  ROUTE_EXPLORE,
  ROUTE_LOGIN,
  ROUTE_MAP,
  ROUTE_WISHLIST,
} from "./constants/routes";
import Login from "./screens/login/Login";
import Explore from "./screens/explore/Explore";
import Wishlist from "./screens/wishlist/Wishlist";
import Map from "./screens/map/Map";
import PropertyDetails from "./screens/propertyDetails/PropertyDetails";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      // {
      //   path: "",
      //   element: <Explore />,
      // },
      {
        path: ROUTE_EXPLORE,
        element: <Explore />,
      },
      {
        path: `${ROUTE_EXPLORE}/:id`, // Dynamic route for property details
        element: <PropertyDetails />,
      },
      {
        path: ROUTE_WISHLIST,
        element: <Wishlist />,
      },
      {
        path: ROUTE_MAP,
        element: <Map />,
      },
      {
        path: ROUTE_LOGIN,
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <div style={{backgroundColor: "gray", padding: "1rem", textAlign: "center"}}>404</div>,
  }
]);

function App() {

  return <RouterProvider router={router} />;
}

export default App;
