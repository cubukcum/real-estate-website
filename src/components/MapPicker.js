// components/MapPicker.js
import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "../styles/MapPicker.css";

// Konya coordinates (center of Turkey)
const defaultCenter = { lat: 37.866667, lng: 32.483333 };
const mapOptions = {
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

const MapPicker = ({ onAddressSelect, initialAddress }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });

    // Reverse geocode to get address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        onAddressSelect(results[0].formatted_address);
      }
    });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="map-picker">
      <GoogleMap
        mapContainerClassName="google-map"
        mapContainerStyle={{
          height: "400px",
        }}
        zoom={12}
        center={defaultCenter}
        onClick={handleMapClick}
        options={mapOptions}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>

      <div className="map-instructions">
        <small className="text-muted">
          Click on the map to select project location
        </small>
      </div>
    </div>
  );
};

export default MapPicker;
