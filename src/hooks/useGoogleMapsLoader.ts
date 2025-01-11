import { useLoadScript, Libraries } from "@react-google-maps/api";

const libraries:Libraries= ["places","marker"];
const useGoogleMapsLoader = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return {isLoaded, loadError};
};

export default useGoogleMapsLoader;