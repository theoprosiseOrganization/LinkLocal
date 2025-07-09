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

const MapWithDrawing = () => {
  const drawingManager = useDrawingManager();

  useEffect(() => {
    if (!drawingManager) return;

    const listener = drawingManager.addListener('overlaycomplete', (e) => {
      const poly = e.overlay;
      if (poly && poly.getPath) {
        const coords = poly.getPath().getArray().map(point => ({
          lat: point.lat(),
          lng: point.lng()
        }));
        // Log the coordinates of the drawn polygon - just for demonstrating working functionality
        console.log(coords);
      }
    });

    return () => {
      if (listener) listener.remove();
    };
  }, [drawingManager]);

  return (
    <Map
      defaultZoom={3}
      defaultCenter={{ lat: 22.54992, lng: 0 }}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  );
};

export default MapWithDrawing;