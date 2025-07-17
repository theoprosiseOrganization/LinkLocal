/**
 * useDrawingManager.jsx
 * This custom hook initializes a Google Maps DrawingManager to allow users to draw polygons on the map.
 * It uses the @vis.gl/react-google-maps library to integrate with Google Maps.
 * The DrawingManager provides a UI for drawing shapes and allows for editing and dragging of polygons.
 *
 * @hook
 * @example
 * const drawingManager = useDrawingManager();
 */
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export function useDrawingManager() {
  const map = useMap();
  const drawing = useMapsLibrary("drawing");
  const [drawingManager, setDrawingManager] = useState(null);

  useEffect(() => {
    if (!map || !drawing) return;

    const newDrawingManager = new drawing.DrawingManager({
      map,
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
      },
      polygonOptions: { editable: true, draggable: true },
    });

    setDrawingManager(newDrawingManager);

    return () => {
      newDrawingManager.setMap(null);
    };
  }, [map, drawing]);

  return drawingManager;
}
