import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
  useEffect(() => {
    navigate("/explore");
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
