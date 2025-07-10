/**
 * MapWithDrawing.jsx
 * This component renders a Google Map with drawing capabilities using the @vis.gl/react-google-maps library.
 * It allows users to draw polygons on the map and logs the coordinates of the drawn polygons.
 * 
 * @component
 * @example
 * <MapWithDrawing />
 * @returns {JSX.Element} The rendered MapWithDrawing component.
 */
import React, { useEffect } from 'react';
import { Map } from '@vis.gl/react-google-maps';
import { useDrawingManager } from './useDrawingManager';
import {eventsWithinPolygon} from '../../api'

const MapWithDrawing = () => {
  const drawingManager = useDrawingManager();

  useEffect(() => {
    if (!drawingManager) return;

    const listener = drawingManager.addListener('overlaycomplete', async (e) => {
      const poly = e.overlay;
      if (poly && poly.getPath) {
        const coords = poly.getPath().getArray().map(point => ({
          lat: point.lat(),
          lng: point.lng()
        }));
        // Log the coordinates of the drawn polygon - just for demonstrating working functionality
        console.log(coords);
        try {
          const events = await eventsWithinPolygon(coords);
          console.log("Events within polygon:", events);
        } catch (err) {
          console.error("Failed to fetch events within polygon:", err);
        }
      }
    });

    return () => {
      if (listener) listener.remove();
    };
  }, [drawingManager]);

  return (
    <Map
      defaultZoom={10}
      defaultCenter={{ lat: 37.4845, lng: -122.1478 }}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  );
};

export default MapWithDrawing;