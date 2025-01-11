import { useEffect, useRef, useState } from "react";
import "./Explore.scss";
import ExploreCard from "./ExploreCard";
import propBuild1 from "@/assets/images/propBuild1.jpeg";
import propBuild2 from "@/assets/images/propBuild2.jpeg";
import propBuild3 from "@/assets/images/propBuild3.jpeg";
import propBuild4 from "@/assets/images/propBuild4.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { setProperties } from "@/app/features/properties/propertiesSlice";

// Static data can be moved outside the component
const SLIDE1 = Array(5).fill(propBuild1);
const SLIDE2 = Array(5).fill(propBuild2);
const SLIDE3 = Array(5).fill(propBuild3);
const SLIDE4 = Array(5).fill(propBuild4);

// Dummy API to simulate fetching data
const fetchMoreData = (startIndex: number, limit: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDetails = Array(limit)
        .fill(null)
        .map((_, index) => ({
          id: startIndex + index + 1,
          name: `Property ${startIndex + index + 1}`,
          availability: `Mar ${startIndex + index + 1} - ${startIndex + index + 6}`,
          seen: `${(Math.random() * 100000).toFixed(0)}`,
          rating: (Math.random() * 5).toFixed(2),
          wishlisted: false,
          slides: [SLIDE1, SLIDE2, SLIDE3, SLIDE4][index % 4],
        }));
      resolve(newDetails);
    }, 2000); // Simulate network delay
  });
};

function Explore() {

  const dispatch = useDispatch();
  const {properties} = useSelector((state: any) => state.property);
  const observerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Initial load
    const loadData = async () => {
      setLoading(true);
      const newData:any = await fetchMoreData(0, 4);
      dispatch(setProperties(newData));
      setLoading(false);
    };
    if(properties.length === 0) loadData();
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading) {
          setLoading(true);
          // Fetch more data when the last item is in view
          const newData:any = await fetchMoreData(page * 4, 4);
          dispatch(setProperties([...properties, ...newData]));
          setPage((prevPage) => prevPage + 1);
          setLoading(false);
        }
      },
      {
        rootMargin: "100px", // Trigger when the last item is 100px near the bottom
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, page, properties]); // Re-run the effect when loading or page changes

  return (
    <div className="explore">
      {properties.map((detail: any) => (
        <ExploreCard key={detail.id} details={detail} />
      ))}
      {loading && <div>Loading...</div>}
      {/* Observer target */}
      <div ref={observerRef} style={{ height: "20px" }} />
    </div>
  );
}

export default Explore;
