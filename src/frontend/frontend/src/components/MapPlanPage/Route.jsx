/**
 * Route Component
 * Displays the route on the map with markers for start, end, and stops.
 * Adjusts the map viewport to fit the route bounds.
 * Renders polylines for each step in the route.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.route - The route data containing legs and steps.
 * @param {Array} [props.event_ids=[]] - Optional array of event IDs associated with the route.
 * @returns {JSX.Element|null} The rendered Route component or null if no route is provided.
 * @example
 * <Route route={routeData} />
 */
import React, { useEffect, useState, useCallback } from "react";
import {
  useMap,
  AdvancedMarker,
  useAdvancedMarkerRef,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { AdvancedMarkerWithRef } from "../MapComponent/MapComponent";
import Polyline from "./Polyline";
import { getEventById } from "../../api";
import ViewEventButton from "../ViewEventPage/ViewEventButton";

const Route = ({ route, event_ids }) => {
  const map = useMap();
  const [events, setEvents] = useState([]);
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  if (event_ids.length != 0) {
    useEffect(() => {
      const fetchEvents = async () => {
        const fetchedEvents = await Promise.all(
          event_ids.map((id) => getEventById(id))
        );
        setEvents(fetchedEvents);
      };
      fetchEvents();
    }, [event_ids]);
  }
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

  useEffect(() => {
    if (!route || !map) return;
    const { high, low } = route.viewport;
    map.fitBounds({
      north: high.latitude,
      south: low.latitude,
      east: high.longitude,
      west: low.longitude,
    });
  }, [route, map]);
  if (!route) return null;

  const routeSteps = route.legs.flatMap((leg) => leg.steps);
  const markers = [];
  route.legs.forEach((leg, idx) => {
    const { latitude, longitude } = leg.startLocation.latLng;
    markers.push(
      <AdvancedMarker
        key={`stop-${idx}`}
        position={{ lat: latitude, lng: longitude }}
      />
    );
  });
  const endLocation = route.legs[route.legs.length - 1];
  markers.push(
    <AdvancedMarker
      key="destination"
      position={{
        lat: endLocation.endLocation.latLng.latitude,
        lng: endLocation.endLocation.latLng.longitude,
      }}
    />
  );

  return (
    <>
      {markers}
      {routeSteps.map((step, idx) => (
        <Polyline
          key={idx}
          encodedPath={step.polyline.encodedPolyline}
          strokeWeight={3}
          strokeColor="#0074D9"
        />
      ))}
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
            title={event.title}
          />
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
    </>
  );
};

export default Route;
