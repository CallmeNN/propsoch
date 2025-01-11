import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GeocodedAddress {
  formatted_address: string;
  place_id: string;
  address_components: any[];
}

export const getGeocodedAddress = (
  latitude: number | undefined = 0.0,
  longitude: number | undefined = 0.0
): Promise<GeocodedAddress> => {
  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat: latitude, lng: longitude };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && Array.isArray(results) && results[0]) {
        const { formatted_address, place_id, address_components } = results[0];
        resolve({ formatted_address, place_id, address_components });
      } else {
        reject("Geocoder failed due to: " + status);
      }
    });
  });
};
