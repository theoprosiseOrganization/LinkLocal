/**
 * MapPlan.jsx
 * This component renders a map with drawing capabilities using the @vis.gl/react-google-maps library
 * It requires a Google Maps API key to function.
 * The map allows users to draw polygons and view them on the map.
 * It also fetches events within the drawn polygon and displays them in a list.
 * 
 * @component
 * @example
 * <MapPlan />
 * @returns {JSX.Element} The rendered MapPlan component.
 */

import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import MapWithDrawing from "./MapWithDrawing";
import "./MapPlan.css"
const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import { APIProvider } from "@vis.gl/react-google-maps";



export default function MapPlan() {
  const [eventsInPoly, setEventsInPoly] = useState([]);
  return (
    <Layout>
      <div className="map-plan-page">
        <h1>Map Plan Page</h1>
    <APIProvider apiKey={MAPS_KEY}>
          <MapWithDrawing onEventsFound={setEventsInPoly} />
          </APIProvider>
          <ul>
            {eventsInPoly.map(event => (
            <li key={event.id}> Event ID: {event.id}</li>
          ))}
          </ul>
      </div>
    </Layout>
  );
}
