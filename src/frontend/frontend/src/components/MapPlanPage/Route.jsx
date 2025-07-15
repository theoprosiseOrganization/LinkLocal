/**
 * Route Component
 * Displays the route on the map with markers for start, end, and stops.
 * Adjusts the map viewport to fit the route bounds.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.route - The route data containing legs and steps.
 * @returns {JSX.Element|null} The rendered Route component or null if no route is provided.
 * @example
 * <Route route={routeData} />
 */
import React, { useEffect } from "react";
import { useMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import Polyline from "./Polyline";

const Route = ({ route, event_ids = [] }) => {
  const map = useMap();

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
    </>
  );
};

export default Route;
