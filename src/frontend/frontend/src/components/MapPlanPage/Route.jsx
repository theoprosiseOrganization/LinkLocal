import React, { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import Polyline from "./Polyline";

const Route = ({ route }) => {
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

  return (
    <>
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
