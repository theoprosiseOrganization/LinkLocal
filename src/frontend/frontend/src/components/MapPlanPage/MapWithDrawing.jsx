import React, { useEffect, useRef } from "react";
const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function MapWithDrawing() {
  const ref = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=drawing`;
    script.async = true;
    script.onload = () => {
      const map = new window.google.maps.Map(ref.current, {
        center: { lat: 37.4845, lng: -122.1478 },
        zoom: 10,
      });
      const drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            window.google.maps.drawing.OverlayType.POLYGON,
            window.google.maps.drawing.OverlayType.CIRCLE,
          ],
        },
      });
      drawingManager.setMap(map);
    };
    document.body.appendChild(script);
  }, []);

  return <div ref={ref} style={{ width: "80vw", height: "80vh" }} />;
}