import { useSelector } from "react-redux";
import ExploreCard from "../explore/ExploreCard";

function Wishlist() {
  const {properties} = useSelector((state: any) => state.property);

  const wishlistedProperties = properties.filter((property:any) => property.wishlisted);  
  return (
    <div className="explore">
      {wishlistedProperties.map((detail:any) => (
        <ExploreCard key={detail.id} details={detail} />
      ))}
    </div>
  );
}

export default Wishlist