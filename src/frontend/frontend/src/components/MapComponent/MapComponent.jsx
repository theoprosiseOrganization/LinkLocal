/**
 * MapComponent.jsx
 * This component renders a Google Map using the @vis.gl/react-google-maps library.
 * It requires a Google Maps API key to function.
 * It will display a map with event markets based on the events props passed to it.
 *
 * Need to get user location and style the map to hide POI labels.
 *
 * Event icon based on event type - for later.
 * Issue with opening info window and then opening another info window.
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
  InfoWindow,
  Pin,
} from "@vis.gl/react-google-maps";
import ViewEventButton from "../ViewEventPage/ViewEventButton";
import UserLocationMarker from "./UserLocationMarker";
import { hi } from "date-fns/locale";

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/**
 *
 * AdvancedMarkerWithRef component
 * This component wraps the AdvancedMarker component and provides a ref to the marker.
 * It allows for handling marker click events and passing the marker reference to the parent component.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The children to render inside the marker.
 * @param {Function} props.onMarkerClick - Callback function to handle marker click events.
 * @param {Object} props.advancedMarkerProps - Additional properties for the AdvancedMarker component.
 */
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
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [closeInfoWindow, setCloseInfoWindow] = useState(false);
  const defaultCoordinates = {
    lat: 37.4845,
    lng: -122.1478,
  };

  const onMarkerClick = useCallback(
    (id, marker) => {
      if (id !== selectedId) {
        setSelectedId(id);
        setSelectedMarker(marker);
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

  const emojiMap = {
    happy: "😊",
    joy: "😊",
    smile: "😊",
    sad: "😢",
    unhappy: "😢",
    cry: "😢",
    party: "🎉",
    celebration: "🎉",
    event: "🎉",
    love: "❤️",
    heart: "❤️",
    angry: "😠",
    mad: "😠",
    food: "🍔",
    eat: "🍔",
    drink: "🥤",
    beverage: "🥤",
    music: "🎵",
    concert: "🎵",
    sports: "⚽",
    game: "⚽",
    run: "🏃",
    walk: "🚶",
    travel: "✈️",
    flight: "✈️",
    car: "🚗",
    drive: "🚗",
    book: "📚",
    read: "📚",
    water: "💧",
    swim: "🏊",
    beach: "🏖️",
    mountain: "🏔️",
    hike: "🥾",
    nature: "🌳",
  };

  return (
    <APIProvider apiKey={MAPS_KEY}>
      <div
        className="MapComponent-root"
        style={{ width: "100%", height: "100%" }}
      >
        <Map
          mapId="4f917a8c04fdd7367b6986a1"
          style={{ width: "100%", height: "100%" }}
          defaultCenter={
            currentLocation
              ? { lat: currentLocation.lat, lng: currentLocation.lng }
              : defaultCoordinates
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
          <UserLocationMarker />

          {events.map((event, idx) =>
            event.location &&
            event.tags &&
            event.tags.length > 0 &&
            typeof event.location.latitude === "number" &&
            typeof event.location.longitude === "number" ? (
              <AdvancedMarkerWithRef
                key={event.id || idx}
                position={{
                  lat: event.location.latitude,
                  lng: event.location.longitude,
                }}
                onMarkerClick={(marker) => onMarkerClick(event.id, marker)}
                title={event.title}
              >
                <Pin
                  glyph={`${
                    emojiMap[event.tags[0].name.toLowerCase()] || "❓"
                  }`}
                  background={"white"}
                  glyphColor={"white"}
                  borderColor={"#000"}
                />
              </AdvancedMarkerWithRef>
            ) : null
          )}
          {users &&
            users.map((user, idx) =>
              user.location &&
              typeof user.location.latitude === "number" &&
              typeof user.location.longitude === "number" ? (
                <AdvancedMarkerWithRef
                  key={user.id || `user-${idx}`}
                  position={{
                    lat: user.location.latitude,
                    lng: user.location.longitude,
                  }}
                  title={user.name || "User"}
                >
                  <Pin
                    glyph={"👤"}
                    background={"#007bff"}
                    glyphColor={"white"}
                    borderColor={"#007bff"}
                  />
                </AdvancedMarkerWithRef>
              ) : null
            )}

          {infoWindowShown && selectedMarker && (
            <InfoWindow
              anchor={selectedMarker}
              onCloseClick={handleInfoWindowCloseClick}
            >
              <div
                style={{
                  background: "#1a202c",
                  color: "#fff",
                  padding: "16px",
                  borderRadius: "8px",
                  minWidth: "180px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                <h2 style={{ color: "#fff", margin: "0 0 8px 0" }}>
                  {events.find((ev) => ev.id === selectedId)?.title || "Event"}
                </h2>
                <p style={{ color: "#fff", margin: 0 }}>
                  {events.find((ev) => ev.id === selectedId) ? (
                    <ViewEventButton eventId={selectedId} />
                  ) : (
                    " No event found"
                  )}
                </p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
