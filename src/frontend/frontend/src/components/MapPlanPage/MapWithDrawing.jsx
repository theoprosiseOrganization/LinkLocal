import React, { useRef, useEffect, useState, useCallback } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function MapWithDrawing({ events = [], currentLocation }) {
  const mapRef = useRef(null);
  const drawingManagerRef = useRef(null);
  const [markers, setMarkers] = useState(events);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;

    const dm = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
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
    dm.setMap(map);
    drawingManagerRef.current = dm;

    google.maps.event.addListener(dm, "polygoncomplete", handlePolygonComplete);
  }, []);

  const handlePolygonComplete = async (polygon) => {
    const path = polygon
      .getPath()
      .getArray()
      .map((latLng) => [latLng.lat(), latLng.lng()]);
    if (
      (path.length > 0 && path[0][0] !== path[path.length - 1][0]) ||
      path[0][1] !== path[path.length - 1][1]
    ) {
      path.push(path[0]);
    }

    const geojson = {
      type: "Polygon",
      coordinates: [path],
    };

    // send to backend
    // addPolygon(geojson)
    // get events in polygon
    polygon.setMap(null);
  };

  return (
    <APIProvider apiKey={MAPS_KEY} libraries={["drawing"]}>
      <div style={{ width: "100%", height: "100%" }}>
        <Map
          onLoad={onMapLoad}
          defaultCenter={currentLocation || { lat: 37.4845, lng: -122.1478 }}
          defaultZoom={10}
          gestureHandling={"greedy"}
          style={{ width: "80%", height: "80%" }}
          options={{
            disableDefaultUI: true,
          }}
        >
          {/* Current location marker */}
          {currentLocation && (
            <AdvancedMarker
              position={{
                lat: currentLocation.lat,
                lng: currentLocation.lng,
              }}
              title="Your Location"
            />
          )}

          {/* Event markers */}
          {markers.map((event) => (
            <AdvancedMarker
              key={event.id}
              position={{
                lat: ev.location.latitude,
                lng: ev.location.longitude,
              }}
              title={ev.title}
            />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}
