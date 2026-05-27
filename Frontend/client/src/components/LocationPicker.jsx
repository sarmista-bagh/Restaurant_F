import React, { useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import { FiMapPin, FiNavigation, FiSearch } from "react-icons/fi";

const containerStyle = {
  width: "100%",
  height: "420px",
};

const defaultCenter = {
  lat: 17.385044,
  lng: 78.486671,
};

const libraries = ["places"];

const LocationPicker = ({ onLocationSelect }) => {
  const [center, setCenter] = useState(defaultCenter);
  const [marker, setMarker] = useState(defaultCenter);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
    libraries,
  });

  // Reverse Geocode
  const getAddressFromLatLng = (location) => {
    if (!window.google) return;

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        setAddress(results[0].formatted_address);
      }
    });
  };

  // Current Location
  const handleCurrentLocation = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setCenter(loc);
        setMarker(loc);

        getAddressFromLatLng(loc);
        setLoading(false);
      },
      () => {
        setLoading(false);
        alert("Please enable location permission");
      },
    );
  };

  // Search location
  const onPlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (!place?.geometry) return;

    const loc = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    setCenter(loc);
    setMarker(loc);

    setAddress(place.formatted_address || place.name);
  };

  // Drag marker
  const onMarkerDragEnd = (e) => {
    const loc = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    setMarker(loc);
    setCenter(loc);

    getAddressFromLatLng(loc);
  };

  // Confirm location
  const handleConfirm = () => {
    if (!address) {
      alert("Select a valid location first");
      return;
    }

    onLocationSelect?.({
      address,
      lat: marker.lat,
      lng: marker.lng,
    });
  };

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading Map...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-[28px] shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
          <h1 className="text-3xl font-bold">Choose Delivery Location</h1>
          <p className="text-orange-100">Search or use your current location</p>
        </div>

        <div className="p-6">
          {/* SEARCH + BUTTON */}
          <div className="flex flex-col lg:flex-row gap-4 mb-5">
            {/* SEARCH */}
            <div className="relative w-full">
              <FiSearch className="absolute top-4 left-4 text-gray-400" />

              <Autocomplete
                onLoad={(ac) => (autocompleteRef.current = ac)}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Search for area, street, city..."
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 shadow-md outline-none focus:ring-4 focus:ring-orange-200"
                />
              </Autocomplete>
            </div>

            {/* CURRENT LOCATION */}
            <button
              onClick={handleCurrentLocation}
              className="h-14 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold flex items-center gap-2 shadow-lg transition"
            >
              <FiNavigation />
              {loading ? "Locating..." : "Locate Me"}
            </button>
          </div>

          {/* MAP */}
          <div className="rounded-2xl overflow-hidden shadow-xl border">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              <Marker position={marker} draggable onDragEnd={onMarkerDragEnd} />
            </GoogleMap>
          </div>

          {/* ADDRESS CARD */}
          <div className="mt-5 bg-orange-50 border border-orange-200 rounded-2xl p-5 shadow-md flex gap-4">
            <div className="bg-orange-500 text-white p-3 rounded-xl">
              <FiMapPin size={22} />
            </div>

            <div>
              <h3 className="font-bold text-lg">Delivery Address</h3>

              <p className="text-gray-700 mt-1">
                {address || "Select a location from map"}
              </p>

              <p className="text-sm text-orange-600 mt-2">
                Lat: {marker.lat.toFixed(5)} | Lng: {marker.lng.toFixed(5)}
              </p>
            </div>
          </div>

          {/* CONFIRM BUTTON */}
          <button
            onClick={handleConfirm}
            className="w-full mt-6 h-14 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-xl hover:scale-[1.01] transition"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
