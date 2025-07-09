import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export function DrawingManager({ initialValue = null }) {
  const map = useMap();
  const drawing = useMapsLibrary('drawing');
  const [drawingManager, setDrawingManager] = useState<google.maps.drawing.DrawingManager>;

  useEffect(() => {
    if (!map || !drawing) return;

    const newDrawingManager = new drawing.DrawingManager({
      map,
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          window.google.maps.drawing.OverlayType.POLYGON,
        ]
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