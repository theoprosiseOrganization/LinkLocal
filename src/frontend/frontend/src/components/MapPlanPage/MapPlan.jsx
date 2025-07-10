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
import "./MapPlan.css";
const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import { APIProvider } from "@vis.gl/react-google-maps";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { getEventById } from "../../api";

export default function MapPlan() {
  const [eventsInPoly, setEventsInPoly] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredEvents = eventsInPoly.filter((event) => {
    if (!startDate && !endDate) return true;
    const eventStart = new Date(event.startTime);
    const eventEnd = new Date(event.endTime);
    const filterStart = startDate ? new Date(startDate) : null;
    const filterEnd = endDate ? new Date(endDate) : null;

    // Check for overlap between event and filter period
    return (
      (!filterStart || eventEnd >= filterStart) &&
      (!filterEnd || eventStart <= filterEnd)
    );
  });

  return (
    <Layout>
      <div className="map-plan-page">
        <h1>Map Plan Page</h1>
        <p>Step 1: Draw your area for events:</p>
        <APIProvider apiKey={MAPS_KEY}>
          <MapWithDrawing onEventsFound={setEventsInPoly} />
        </APIProvider>
        <p>Step 2: What period are you available for your events?</p>

        <div className="flex gap-4 mb-4">
          <div>
            <Label htmlFor="filter-start">Start</Label>
            <Input
              id="filter-start"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="filter-end">End</Label>
            <Input
              id="filter-end"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <ul>
          {filteredEvents.map((event) => (
            <li key={event.id}>Event ID: {event.id}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
