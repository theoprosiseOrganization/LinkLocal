/**
 * MapComponent.jsx
 * This component renders a Google Map using the @vis.gl/react-google-maps library.
 * It requires a Google Maps API key to function.
 * It will display a map with event markets based on the events props passed to it.
 * I will need to implement the logic to fetch events from the backend and pass them as props.
 *
 * @component
 * @example
 * <MapComponent />
 * @returns {JSX.Element} The rendered MapComponent.
 */

import React from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function MapComponent({ events = [], currentLocation }) {
  return (
    <APIProvider apiKey={MAPS_KEY}>
      <div style={{ width: "100%", height: "100%" }}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={
            currentLocation
              ? { lat: currentLocation.lat, lng: currentLocation.lng }
              : { lat: 37.4845, lng: -122.1478 }
          }
          defaultZoom={15}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          {/* Render current location marker if provided */}
          {currentLocation && (
            <AdvancedMarker
              position={{
                lat: currentLocation.lat,
                lng: currentLocation.lng,
              }}
              title="Your Location"
            />
          )}

          {/* Render event markers */}
          {events.map((event, idx) =>
            event.location && event.location.lat && event.location.lng ? (
              <AdvancedMarker
                key={event.id || idx}
                position={{
                  lat: event.location.lat,
                  lng: event.location.lng,
                }}
                title={event.title}
              />
            ) : null
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
