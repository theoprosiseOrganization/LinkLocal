/**
 * MapPlan.jsx
 * This component renders a map with drawing capabilities using the @vis.gl/react-google-maps library
 * It requires a Google Maps API key to function.
 * The map allows users to draw polygons and view them on the map.
 * It also fetches events within the drawn polygon and displays them in a list.
 * It includes functionality to filter events by date and select events to calculate an optimal route.
 * The component also allows users to select events and calculate a route from their location to the selected
 * events.
 * It provides the feature to save and share the plan with followers.
 *
 *
 * @component
 * @example
 * <MapPlan />
 * @returns {JSX.Element} The rendered MapPlan component.
 */

import React, { useEffect, useRef, useState } from "react";
import Layout from "../Layout/Layout";
import MapWithDrawing from "./MapWithDrawing";
const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import { APIProvider } from "@vis.gl/react-google-maps";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  getSessionUserId,
  getUserById,
  getOptimalRoute,
  createPlan,
  inviteUsers,
  getUserFollowers,
} from "../../api";
import Route from "./Route";
import UserLocationMarker from "../MapComponent/UserLocationMarker";

export default function MapPlan() {
  const [eventsInPoly, setEventsInPoly] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedEventIds, setSelectedEventIds] = useState([]);
  const [routeData, setRouteData] = useState(null);
  const drawnPolygon = useRef(null);
  const [planId, setPlanId] = useState(null);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [selectedFollowers, setSelectedFollowers] = useState([]);
  const [planTitle, setPlanTitle] = useState("My Event Plan");
  const [isEventSelectOpen, setIsEventSelectOpen] = useState(false);
  const [tempSelectedEventIds, setTempSelectedEventIds] = useState([]);

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
    const result = await getOptimalRoute(userLocation, waypoints);
    setRouteData(result.routes?.[0] || null);
    if (drawnPolygon.current) {
      drawnPolygon.current.setMap(null); // Clear polygon to highlight the route
      drawnPolygon.current = null;
    }
  };

  async function saveAndShare() {
    setIsInviteOpen(true);
  }

  useEffect(() => {
    if (!isInviteOpen) return;
    (async () => {
      const myId = await getSessionUserId();
      const followers = await getUserFollowers(myId);
      setFollowers(followers);
    })();
  }, [isInviteOpen]);

  const openEventSelectModal = () => {
    setTempSelectedEventIds(selectedEventIds);
    setIsEventSelectOpen(true);
  };

  const confirmEventSelection = () => {
    setSelectedEventIds(tempSelectedEventIds);
    setIsEventSelectOpen(false);
  };

  const handleTempSelectEvent = (eventId) => {
    setTempSelectedEventIds((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  return (
    <Layout>
      <div className="map-plan-page max-w-5xl mx-auto mt-10 bg-[var(--card)] text-[var(--card-foreground)] rounded-xl shadow-lg border border-[var(--border)] p-8">
        <h1 className="text-2xl font-bold mb-4 text-[var(--primary)]">
          Map Plan Page
        </h1>
        <p className="mb-2 text-[var(--foreground)] font-medium">
          Step 1: Draw your area for events:
        </p>
        <div className="h-[55vh] mb-4 w-full rounded-lg overflow-hidden">
          <APIProvider apiKey={MAPS_KEY}>
            <MapWithDrawing
              onEventsFound={setEventsInPoly}
              onPolygonDrawn={(poly) => (drawnPolygon.current = poly)}
            />
            {routeData && (
              <Route
                route={routeData}
                event_ids={selectedEventIds}
              />
            )}
            <UserLocationMarker/>
          </APIProvider>
        </div>
        <p className="mb-2 text-[var(--foreground)] font-medium">
          Step 2: What period are you available for your events?
        </p>
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
        <p className="mb-2 text-[var(--foreground)] font-medium">
          Step 3: Choose which events from your criteria you want to attend:
        </p>
        <Button
          onClick={openEventSelectModal}
          className="mb-4 bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition"
        >
          Choose Events
        </Button>
        <Dialog open={isEventSelectOpen} onOpenChange={setIsEventSelectOpen}>
          <DialogContent className="sm:max-w-[700px] bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] rounded-xl shadow">
            <DialogHeader>
              <DialogTitle>Select Events</DialogTitle>
              <DialogDescription>
                Choose the events you want to include in your plan.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={`event-card border rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-150 shadow ${
                    tempSelectedEventIds.includes(event.id)
                      ? "border-[var(--primary)] bg-[var(--primary-foreground)]"
                      : "border-[var(--border)] bg-[var(--background)]"
                  }`}
                  style={{
                    minHeight: "300px",
                    maxHeight: "350px",
                    minWidth: "250px",
                    maxWidth: "400px",
                  }}
                  onClick={() => handleTempSelectEvent(event.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={tempSelectedEventIds.includes(event.id)}
                        onChange={() => handleTempSelectEvent(event.id)}
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
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEventSelectOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmEventSelection}
                disabled={tempSelectedEventIds.length === 0}
              >
                Confirm Selection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <p className="mb-4 text-[var(--muted-foreground)]">
          When selected, calculate the optimal route from your location to your
          events:
        </p>
        <Button
          onClick={getRoute}
          className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition"
        >
          Calculate
        </Button>
        <Button
          onClick={saveAndShare}
          disabled={!routeData}
          className="ml-2 border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition"
          variant="outline"
        >
          Save and Share Plan
        </Button>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogContent className="sm:max-w-[425px] bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] rounded-xl shadow">
            <DialogHeader>
              <div className="mb-4">
                <Label htmlFor="plan-title">Plan Title</Label>
                <Input
                  id="plan-title"
                  value={planTitle}
                  placeholder="Enter plan title"
                  onChange={(e) => setPlanTitle(e.target.value)}
                />
              </div>
              <DialogTitle>Invite Followers</DialogTitle>
              <DialogDescription>
                Select followers to invite to your plan.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              {followers.map((follower) => (
                <label
                  key={follower.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="accent-blue-600 w-5 h-5"
                    checked={selectedFollowers.includes(follower.id)}
                    onChange={() => {
                      setSelectedFollowers((prev) =>
                        prev.includes(follower.id)
                          ? prev.filter((id) => id !== follower.id)
                          : [...prev, follower.id]
                      );
                    }}
                  />
                  <span className="text-sm">{follower.name}</span>
                </label>
              ))}
              {followers.length === 0 && (
                <div className="text-gray-500 text-sm">
                  No followers found. Gain followers to send plan invites.
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                Cancel
              </Button>
              <Button
                disabled={selectedFollowers.length === 0 || !planTitle.trim()}
                onClick={async () => {
                  const plan = await createPlan({
                    title: planTitle,
                    eventIds: selectedEventIds,
                    routeData: routeData,
                  });
                  setPlanId(plan.id);
                  await inviteUsers(plan.id, selectedFollowers);
                  setIsInviteOpen(false);
                  alert("Invitations sent successfully!");
                }}
              >
                Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
