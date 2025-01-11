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
  href: string;
  icon: string;
  activeIcon: string;
}

const BottomNavItem = ({
  label,
  href,
  icon,
  activeIcon,
}: BottomNavItemProps) => {
  const isSelected = useMatch(href);

  return (
    <Link to={href}>
      <div className="">
        <img
          src={isSelected ? activeIcon : icon}
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
      href: ROUTE_EXPLORE,
      icon: SearchIcon,
      activeIcon: "/icons/explore-active.svg",
    },
    {
      label: "Wishlist",
      href: ROUTE_WISHLIST,
      icon: HeartIcon,
      activeIcon: "/icons/explore-active.svg",
    },
    {
      label: "Show map",
      href: ROUTE_MAP,
      icon: LocationIcon,
      activeIcon: "/icons/explore-active.svg",
    },
    {
      label: "Log In",
      href: ROUTE_LOGIN,
      icon: ProfileIcon,
      activeIcon: "/icons/explore-active.svg",
    },
  ];

  return (
    <footer className="fixed bottom-0">
      {navItemsObj.map((item) => (
        <BottomNavItem key={item.label} {...item} />
      ))}
    </footer>
  );
}

export default BottomNavigation;
