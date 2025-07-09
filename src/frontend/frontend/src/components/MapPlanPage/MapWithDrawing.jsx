import React, { useRef, useEffect, useState, useCallback } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function MapComponent({ events = [], currentLocation }) {
  const mapRef = useRef(null);
  const drawingManagerRef = useRef(null);
  const [markers, setMarkers] = useState(events);

  const onMapLoad = useCallback((event) => {
    mapRef.current = event.target;

    drawingManagerRef.current = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.Overlaytyp.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
      },
      polygonOptions: {
        fillColor: "#2196F3",
        fillOpacity: 0.2,
        strokeWeight: 2,
        clickable: false,
        editable: false,
        draggable: false,
      },
    });
    drawingManagerRef.current.setMap(mapRef.current);

    google.maps.event.addListener(
      drawingManagerRef.current,
      "polygoncomplete",
      handlePolygonComplete
    );
  }, []);
  
}
