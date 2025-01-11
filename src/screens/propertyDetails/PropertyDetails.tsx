import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import "./PropertyDetails.scss";
import LocationFilledIcon from "@/assets/icons/LocationFilled.svg";
import MapPinBg from "@/assets/icons/MapPinBg.svg";
import useGoogleMapsLoader from "@/hooks/useGoogleMapsLoader";
import { useEffect, useState } from "react";
import { GoogleMap, OverlayView } from "@react-google-maps/api";
import RealEstateMapPin from "@/assets/icons/RealEstateMapPin.svg";
import { getGeocodedAddress } from "@/lib/utils";

function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const property = useSelector((state: RootState) =>
    state.property.properties.find((p: any) => p.id === parseInt(id || "", 10))
  );
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState("");
  const { isLoaded, loadError } = useGoogleMapsLoader();
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          try {
            const { formatted_address } = await getGeocodedAddress(
              position.coords.latitude,
              position.coords.longitude
            );
            setAddress(formatted_address);
          } catch (error) {
            console.error("Error getting geocoded address:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  useEffect(() => {
    if (isLoaded) {
      getCurrentLocation();
    }
  }, [isLoaded]);

  if (!property) {
    return <div>Property not found</div>;
  }

  const RedLocationMarker = ({
    location,
  }: {
    location: { lat: number; lng: number };
  }) => {
    const markerPosition = { lat: location.lat, lng: location.lng };

    return (
      <OverlayView
        position={markerPosition}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div>
          <img
            src={RealEstateMapPin}
            alt="RealEstateMapPin"
            style={{ width: 50, height: 50 }}
          />
        </div>
      </OverlayView>
    );
  };

  const mapOptions = {
    disableDefaultUI: true,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    clickableIcons: false,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  const mapContainerStyle = {
    width: "100%",
    height: "27vh",
  };


  return (
    <div className="property-details flex-col" style={{ marginBottom: "9rem" }}>
      <img
        src={property?.slides[0]}
        alt="property"
        style={{ width: "100%", borderRadius: "16px", marginBottom: "2rem" }}
      />
      <div className="flex justify-between">
        <span className="font-3xl">{property.name}</span>
        <span className="font-3xl">1.5 Cr</span>
      </div>
      <div className="flex justify-between">
        <span className="flex items-center gap-2">
          <img src={LocationFilledIcon} width="20rem" />
          <span style={{ fontSize: "1.2rem", color: "gray" }}>
            {" "}
            Sector 57, Gurgaon
          </span>
        </span>
        <span style={{ fontSize: "1.2rem", color: "gray" }}>EMI Available</span>
      </div>
      <p style={{ fontSize: "2rem", fontWeight: 800 }}>Location</p>
      <div className="flex gap-2 items-center" style={{ marginBottom: "2rem" }}>
        <img src={MapPinBg} />
        <span style={{ fontSize: "1.2rem", color: "gray" }}>{address}</span>
      </div>
      {loadError ? (
        <div>Error loading Google Maps</div>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
          options={mapOptions}
        >
          <RedLocationMarker location={center} />
        </GoogleMap>
      )}
    </div>
  );
}

export default PropertyDetails;
