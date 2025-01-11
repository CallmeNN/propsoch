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
import Login from "./screens/Login";
import Explore from "./screens/Explore";
import Wishlist from "./screens/Wishlist";
import Map from "./screens/Map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <MainSection />,
      },
      {
        path: ROUTE_EXPLORE,
        element: <Explore />,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
