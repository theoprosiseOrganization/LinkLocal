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
import { Button } from "../../../components/ui/button";
import {
  getEventById,
  getSessionUserId,
  getUserById,
  getOptimalRoute,
} from "../../api";
import EventCard from "../EventCard/EventCard";
import Route from "./Route";

export default function MapPlan() {
  const [eventsInPoly, setEventsInPoly] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedEventIds, setSelectedEventIds] = useState([]);
  const [routeData, setRouteData] = useState(null);

  const filteredEvents = eventsInPoly.filter((event) => {
    if (!startDate && !endDate) return true;
    const eventStart = new Date(event.startTime);
    const eventEnd = new Date(event.endTime);
    const filterStart = startDate ? new Date(startDate) : null;
    const filterEnd = endDate ? new Date(endDate) : null;
    return (
      (!filterStart || eventEnd >= filterStart) &&
      (!filterEnd || eventStart <= filterEnd)
    );
  });

  // Toggle event selection
  const handleSelectEvent = (eventId) => {
    setSelectedEventIds((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const getRoute = async () => {
    if (selectedEventIds.length === 0) {
      alert("Please select at least one event to calculate the route.");
      return;
    }
    const userId = await getSessionUserId();
    if (!userId) {
      alert("You must be logged in to calculate a route.");
      return;
    }
    const user = await getUserById(userId);
    if (!user || !user.location) {
      alert("Your location is not set. Please update your profile.");
      return;
    }
    const userLocation = {
      lat: user.location.latitude,
      lng: user.location.longitude,
    };
    const selectedEvents = filteredEvents.filter((e) =>
      selectedEventIds.includes(e.id)
    );
    const waypoints = selectedEvents.map((e) => ({
      lat: e.location.latitude,
      lng: e.location.longitude,
    }));
    console.log("User Location:", userLocation);
    console.log("Waypoints:", waypoints);
    const result = await getOptimalRoute(userLocation, waypoints);
    console.log("Route Result:", result);
    setRouteData(result.routes?.[0] || null);
  };

  return (
    <Layout>
      <div className="map-plan-page">
        <h1>Map Plan Page</h1>
        <p>Step 1: Draw your area for events:</p>
        <APIProvider apiKey={MAPS_KEY}>
          <MapWithDrawing onEventsFound={setEventsInPoly} />
          {routeData && <Route route={routeData} />}
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
        <p>
          Step 3: Choose which events from your criteria you want to attend:
        </p>
        <p>
          When selected, calculate the optimal route from your location to your
          events:
        </p>
        <Button onClick={getRoute}>Calculate</Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`event-card border rounded p-4 flex flex-col justify-between cursor-pointer transition-all duration-150 ${
                selectedEventIds.includes(event.id)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-[#1a202c]"
              }`}
              style={{
                minHeight: "300px",
                maxHeight: "350px",
                minWidth: "250px",
                maxWidth: "400px",
              }}
              onClick={() => handleSelectEvent(event.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedEventIds.includes(event.id)}
                    onChange={() => handleSelectEvent(event.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="accent-blue-600 w-5 h-5"
                  />
                  <span className="card-title font-bold text-lg">
                    {event.title || "Untitled Event"}
                  </span>
                </div>
                {event.startTime && event.endTime && (
                  <span className="text-xs text-gray-400 ml-2">
                    {new Date(event.startTime).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    &ndash;{" "}
                    {new Date(event.endTime).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
              <div className="flex-1 flex items-center justify-center mb-2">
                {event.images && event.images.length > 0 ? (
                  <img
                    src={event.images[0]}
                    alt="Event"
                    className="rounded w-full max-h-32 object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">
                    No images available
                  </span>
                )}
              </div>
              <div className="card-content mt-2">
                <div className="card-description text-sm mb-1">
                  {event.textDescription || "No description"}
                </div>
                <div className="text-xs text-gray-300">
                  {event.location?.address || "No location"}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4">
          Selected Event IDs: {selectedEventIds.join(", ") || "None"}
        </p>
      </div>
    </Layout>
  );
}
