import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function Home() {
  useEffect(() => {
    console.log("Home");
  }, []);
  return (
    <div className="theme-light">
      <Header />
      <Outlet />
      <BottomNavigation />
    </div>
  );
}

export default Home;
