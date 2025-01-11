import { Link, useMatch } from "react-router-dom";
import HeartIcon from "@/assets/icons/Heart.svg";
import LocationIcon from "@/assets/icons/Location.svg";
import ProfileIcon from "@/assets/icons/Profile.svg";
import SearchIcon from "@/assets/icons/Search.svg";
import {
  ROUTE_EXPLORE,
  ROUTE_LOGIN,
  ROUTE_MAP,
  ROUTE_WISHLIST,
} from "@/constants/routes";

interface BottomNavItemProps {
  label: string;
  to: string;
  icon: string;
  activeIcon: string;
}

const BottomNavItem = ({
  label,
  to,
  icon,
  activeIcon,
}: BottomNavItemProps) => {

    const isSelected = useMatch({ path: to, end: true });

  return (
    <Link to={to}>
      <div className="">
        <img
          src={icon}
          alt={label}
          className="w-16 h-16"
        />
      </div>
      <span>{label}</span>
    </Link>
  );
};

function BottomNavigation() {
    
  const navItemsObj = [
    {
      label: "Explore",
      to: ROUTE_EXPLORE,
      icon: SearchIcon,
      activeIcon: "",
    },
    {
      label: "Wishlist",
      to: ROUTE_WISHLIST,
      icon: HeartIcon,
      activeIcon: "",
    },
    {
      label: "Show map",
      to: ROUTE_MAP,
      icon: LocationIcon,
      activeIcon: "",
    },
    {
      label: "Log In",
      to: ROUTE_LOGIN,
      icon: ProfileIcon,
      activeIcon: "",
    },
  ];

  return (
    <footer className=" ">
      {navItemsObj.map((item) => (
        <BottomNavItem key={item.label} {...item} />
      ))}
    </footer>
  );
}

export default BottomNavigation;
