/**
 * MapWithDrawing.jsx
 * This component renders a Google Map with drawing capabilities using the @vis.gl/react-google-maps library.
 * It allows users to draw polygons on the map and fetches events within the drawn polygon.
 * The component listens for the "overlaycomplete" event from the DrawingManager to get the coordinates
 * of the drawn polygon and fetches events within that polygon using the `eventsWithinPolygon`
 * API function.
 * It also accepts a callback function `onEventsFound` to handle the fetched events.
 * 
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.onEventsFound - Callback function to handle events found within the
 * @example
 * <MapWithDrawing />
 * @returns {JSX.Element} The rendered MapWithDrawing component.
 */

import React, { useEffect, useState } from "react";
import { Map } from "@vis.gl/react-google-maps";
import { useDrawingManager } from "./useDrawingManager";
import { eventsWithinPolygon } from "../../api";

const MapWithDrawing = ({ onEventsFound, onPolygonDrawn }) => {
  const drawingManager = useDrawingManager();
  const defaultCoordinates = {
    lat: 37.4845,
    lng: -122.1478,
  };

  useEffect(() => {
    if (!drawingManager) return;

    const listener = drawingManager.addListener(
      "overlaycomplete",
      async (e) => {
        const poly = e.overlay;
        onPolygonDrawn?.(poly);
        if (poly && poly.getPath) {
          const coords = poly
            .getPath()
            .getArray()
            .map((point) => ({
              lat: point.lat(),
              lng: point.lng(),
            }));
          try {
            const events = await eventsWithinPolygon(coords);
            if (onEventsFound) {
              onEventsFound(events);
            }
          } catch (err) {
            // Handle error appropriately
          }
        }
      }
    );

    return () => {
      if (listener) listener.remove();
    };
  }, [drawingManager, onEventsFound]);

  return (
    <Map
      defaultZoom={10}
      defaultCenter={defaultCoordinates}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    />
  );
};

export default MapWithDrawing;
