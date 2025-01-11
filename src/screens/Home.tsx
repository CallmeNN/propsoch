import BottomNavigation from "@/components/BottomNavigation";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function Home() {
    useEffect(()=>{
        console.log("Home")
    },[])
  return (
    <div>
      <Outlet />
      <BottomNavigation />
    </div>
  );
}

export default Home;
