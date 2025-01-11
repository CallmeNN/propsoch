import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "@/components/carousel/EmblaCarousel";
import { Eye, Star, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleWishlist } from "@/app/features/properties/propertiesSlice";

function ExploreCard({
  details,
}: {
  details: {
    id: number;
    name: string;
    availability: string;
    seen: string;
    rating: number;
    wishlisted: boolean;
    slides: any[];
  };
}) {
  const dispatch = useDispatch();
  const { id, name, availability, seen, rating, wishlisted, slides } = details;
  const handleWishlistToggle = (id: number) => {
    dispatch(toggleWishlist(id));
  };

  const OPTIONS: EmblaOptionsType = {};
  return (
    <div className="explore-card">
      <EmblaCarousel slides={slides} options={OPTIONS}>
        <>
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              padding: "1rem",
              paddingRight: "2rem",
              paddingLeft: "2rem",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "30px",
              marginLeft: "1rem",
            }}
          >
            Most Liked
          </span>
          <span onClick={() => handleWishlistToggle(id)}>
            <Heart fill={wishlisted ? "red" : "white"} strokeWidth={0} />
          </span>
        </>
      </EmblaCarousel>
      <div
        className="explore-card-content flex-col"
        style={{ marginTop: "1rem", paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        <div className="flex justify-between">
          <div className="flex gap-2 items-center justify-center">
            <Eye size={15} />
            <span
              style={{
                fontSize: "1.3rem",
              }}
            >
              {seen}
            </span>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <Star
              fill={rating >= 4 ? "green" : rating >= 3 ? "orange" : "red"}
              size={15}
              strokeWidth={0}
            />
            <span
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                color: rating >= 4 ? "green" : rating >= 3 ? "orange" : "red",
              }}
            >
              {rating}
            </span>
          </div>
        </div>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{name}</div>
        <div style={{ fontSize: "1.2rem", color: "gray" }}>{availability}</div>
      </div>
    </div>
  );
}

export default ExploreCard;
