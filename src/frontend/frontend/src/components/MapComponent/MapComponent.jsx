/**
 * MapComponent.jsx
 * This component renders a Google Map using the @vis.gl/react-google-maps library.
 * It requires a Google Maps API key to function.
 * It will display a map with event markets based on the events props passed to it.
 *
 * Need to get user location and style the map to hide POI labels.
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
          mapId="4f917a8c04fdd7367b6986a1"
          style={{ width: "100%", height: "100%" }}
          defaultCenter={
            currentLocation
              ? { lat: currentLocation.lat, lng: currentLocation.lng }
              : { lat: 37.4845, lng: -122.1478 }
          }
          defaultZoom={10}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          options={{
            styles: [
              {
                elementType: "labels",
                featureType: "poi",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
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
            event.location &&
            typeof event.location.latitude === "number" &&
            typeof event.location.longitude === "number" ? (
              <AdvancedMarker
                key={event.id || idx}
                position={{
                  lat: event.location.latitude,
                  lng: event.location.longitude,
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
