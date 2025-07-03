/**
 * MapComponent.jsx
 * This component renders a Google Map using the @vis.gl/react-google-maps library.
 * It requires a Google Maps API key to function.
 * It will display a map with event markets based on the events props passed to it.
 *
 * Need to get user location and style the map to hide POI labels.
 *
 * Event icon based on event type - for later.
 *
 *
 * @component
 * @example
 * <MapComponent />
 * @returns {JSX.Element} The rendered MapComponent.
 */

import React, { useCallback, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useAdvancedMarkerRef,
  CollisionBehavior,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export function AdvancedMarkerWithRef(props) {
  const { children, onMarkerClick, ...advancedMarkerProps } = props;
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      onClick={() => {
        if (marker) {
          onMarkerClick(marker);
        }
      }}
      ref={markerRef}
      {...advancedMarkerProps}
    >
      {children}
    </AdvancedMarker>
  );
}

export default function MapComponent({
  events = [],
  users = [],
  currentLocation,
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [hoverId, setHoverId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(false);
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const onMouseEnter = useCallback((id) => setHoverId(id), []);
  const onMouseLeave = useCallback(() => setHoverId(null), []);
  const onMarkerClick = useCallback(
    (id, marker) => {
      setSelectedId(id);
      if (marker) setSelectedMarker(marker);
      if (id !== selectedId) {
        setInfoWindowShown(true);
      } else {
        setInfoWindowShown((shown) => !shown);
      }
    },
    [selectedId]
  );

  const onMapClick = useCallback(() => {
    setSelectedId(null);
    setSelectedMarker(null);
    setInfoWindowShown(false);
  }, []);

  const handleInfoWindowCloseClick = useCallback(
    () => setInfoWindowShown(false),
    []
  );

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
          onClick={onMapClick}
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
          {/* Current location marker */}
          {currentLocation && (
            <AdvancedMarker
              position={{
                lat: currentLocation.lat,
                lng: currentLocation.lng,
              }}
              title="Your Location"
            />
          )}

          {/* Event markers */}
          {events.map((event, idx) =>
            event.location &&
            typeof event.location.latitude === "number" &&
            typeof event.location.longitude === "number" ? (
              <AdvancedMarkerWithRef
                key={event.id || idx}
                position={{
                  lat: event.location.latitude,
                  lng: event.location.longitude,
                }}
                onMarkerClick={(marker) => onMarkerClick(event.id, marker)}
                onMouseEnter={() => onMouseEnter(event.id)}
                onMouseLeave={onMouseLeave}
                title={event.title}
              />
            ) : null
          )}

          {infoWindowShown && selectedMarker && (
            <InfoWindow
              anchor={selectedMarker}
              onCloseClick={handleInfoWindowCloseClick}
            >
              <div>
                <h2>
                  {events.find((ev) => ev.id === selectedId)?.title || "Event"}
                </h2>
                <p>
                  {events.find((ev) => ev.id === selectedId)?.textDescription ||
                    "No description"}
                </p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
