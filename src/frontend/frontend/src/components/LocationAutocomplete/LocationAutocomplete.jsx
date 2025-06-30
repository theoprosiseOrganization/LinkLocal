/**
 * LocationAutocomplete Component
 * This component provides a location autocomplete input using the Google Maps Places API.
 * It allows users to search for locations and select a place, which triggers the onPlaceSelect
 * callback with the selected place details.
 *
 * @component
 * @example
 * <LocationAutocomplete onPlaceSelect={(place) => console.log(place)} />
 * @param {Object} props - Component properties
 * @param {function} props.onPlaceSelect - Callback function to handle place selection
 * @returns {JSX.Element} The rendered LocationAutocomplete component
 */
import React, { useState, useEffect, useRef } from "react";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";

const LocationAutocomplete = ({ onPlaceSelect }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null); // Add a ref for the container
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !containerRef.current) return;

    // Remove any previous autocomplete element
    if (placeAutocomplete && containerRef.current.contains(placeAutocomplete)) {
      containerRef.current.removeChild(placeAutocomplete);
    }

    // Create and append the PlaceAutocompleteElement
    const autocomplete = new places.PlaceAutocompleteElement();
    containerRef.current.appendChild(autocomplete);

    // Link the input to the autocomplete element
    autocomplete.input = inputRef.current;

    setPlaceAutocomplete(autocomplete);

    // Cleanup on unmount
    return () => {
      if (containerRef.current && autocomplete) {
        containerRef.current.removeChild(autocomplete);
      }
    };
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    // Add event listener for gmp-select event
    placeAutocomplete.addEventListener(
      "gmp-select",
      async ({ placePrediction }) => {
        const place = placePrediction.toPlace();
        console.log("Selected place:", place);

        await place.fetchFields({
          fields: ["displayName", "formattedAddress", "location"],
        });
        onPlaceSelect(place);
      }
    );
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="autocomplete-container" ref={containerRef}></div>
    </APIProvider>
  );
};

export default LocationAutocomplete;
