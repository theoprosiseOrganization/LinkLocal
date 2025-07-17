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
  const [transportType, setTransportType] = useState("DRIVE");
  const [userData, setUserData] = useState(null);
  const [userTagSet, setUserTagSet] = useState(new Set());

  const filterStart = startDate ? new Date(startDate) : null;
  const filterEnd = endDate ? new Date(endDate) : null;

  const filteredEvents = eventsInPoly.filter((event) => {
    if (!filterStart && !filterEnd) return true;
    const eventStart = new Date(event.startTime);
    const eventEnd = new Date(event.endTime);
    if (filterStart && eventEnd < filterStart) return false;
    if (filterEnd && eventStart > filterEnd) return false;
    return true;
  });

  // Toggle event selection
  const handleSelectEvent = (eventId) => {
    setSelectedEventIds((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const computeDistanceKm = (locA, locB) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (locB.lat - locA.lat) * (Math.PI / 180);
    const dLon = (locB.lng - locA.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(locA.lat * (Math.PI / 180)) *
        Math.cos(locB.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const computeTravelTimeMs = (locA, locB) => {
    const distanceKm = computeDistanceKm(locA, locB);
    const factor = distanceKm / 50; // Assuming average speed of 50 km/h
    return factor * 60 * 60 * 1000; // Convert to milliseconds
  };

  const tagScore = (event) => {
    if (!userData || !userData.tags) return 0;
    return (event.tags || []).reduce(
      (score, { name }) => score + (userTagSet.has(name) ? 1 : 0),
      0
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
    const user = userData || (await getUserById(userId));
    if (!user || !user.location) {
      alert("Your location is not set. Please update your profile.");
      return;
    }
    const userLocation = {
      lat: user.location.latitude,
      lng: user.location.longitude,
    };
    const waypoints = selectedEventIds
      .map((id) => filteredEvents.find((e) => e.id === id && e.location))
      .filter(Boolean)
      .map((e) => ({
        lat: e.location.latitude,
        lng: e.location.longitude,
      }));
    if (waypoints.length >= 9) {
      alert("You can only select up to 9 events for route calculation.");
      return;
    }
    const result = await getOptimalRoute(
      userLocation,
      waypoints,
      transportType
    );
    setRouteData(result.routes?.[0] || null);

    if (drawnPolygon.current) {
      drawnPolygon.current.setOptions({
        fillOpacity: 0.1,
        strokeOpacity: 0.3,
      }); // Lower opacity to highlight the route
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

  useEffect(() => {
    (async () => {
      const userId = await getSessionUserId();
      if (!userId) return;
      const user = await getUserById(userId);
      if (user) {
        setUserData(user);
        setUserTagSet(new Set((user.tags || []).map((t) => t.name)));
      } else {
        alert("User not found. Please log in again.");
      }
    })();
  }, []);

  const openEventSelectModal = () => {
    setTempSelectedEventIds(selectedEventIds);
    setIsEventSelectOpen(true);
  };

  const confirmEventSelection = () => {
    setSelectedEventIds(tempSelectedEventIds);
    setIsEventSelectOpen(false);
  };

  const generateEventPlan = () => {
    if (!filterStart || !filterEnd) {
      alert("Please select a time period for the events.");
      return;
    }

    const eventsToGenerate = filteredEvents
      .slice() // copy array
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    if (eventsToGenerate.length === 0) {
      alert("No events found in the selected area/time period.");
      return;
    }

    const usedIds = new Set();
    const picks = [];
    let curTime = filterStart.getTime();
    let curLoc = {
      lat: userData?.location?.latitude,
      lng: userData?.location?.longitude,
    };

    while (true) {
      const candidates = eventsToGenerate.filter((e) => !usedIds.has(e.id));
      if (candidates.length === 0) {
        break;
      }

      const possibleEvents = candidates
        .map((e) => {
          const eventStartMs = new Date(e.startTime).getTime();
          const eventEndMs = new Date(e.endTime).getTime();
          const travelTimeMs = computeTravelTimeMs(curLoc, {
            lat: e.location?.latitude,
            lng: e.location?.longitude,
          });
          const arriveAt = Math.max(eventStartMs, curTime + travelTimeMs);
          return { ...e, arriveAt, eventEndMs };
        })
        // Only keep events that can be attended for a full hour before they end
        .filter(
          (e) =>
            e.arriveAt + 60 * 60 * 1000 <=
            Math.min(e.eventEndMs, filterEnd.getTime())
        );

        if(!possibleEvents || possibleEvents.length === 0) {
          break;
        }

      possibleEvents.sort((a, b) => {
        const diff = tagScore(b) - tagScore(a);
        return diff !== 0 ? diff : a.arriveAt - b.arriveAt;
      });

      const pick = possibleEvents[0];
      picks.push(pick.id);
      usedIds.add(pick.id);

      curTime = pick.arriveAt + 60 * 60 * 1000; // 1 hour at event
      curLoc = {
        lat: pick.location?.latitude,
        lng: pick.location?.longitude,
      }
    }

    setSelectedEventIds(picks);
    if (picks.length === 0) {
      alert("No events could be selected based on your criteria.");
      return;
    }
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
              <Route route={routeData} event_ids={selectedEventIds} />
            )}
            <UserLocationMarker />
          </APIProvider>
        </div>
        <p className="mb-2 text-[var(--foreground)] font-medium">
          Step 2: Select your availability period for the events.
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
          Step 3: Choose which events to attend from your selected criteria or
          generate a plan that matches your criteria.
        </p>
        <Button
          onClick={openEventSelectModal}
          className="mb-4 bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition"
        >
          Choose Events
        </Button>
        <Button onClick={generateEventPlan}>Generate Events</Button>
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
          onClick={() => {
            setTransportType("DRIVE");
            getRoute();
          }}
          className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition"
        >
          Calculate Driving
        </Button>
        <Button
          onClick={() => {
            setTransportType("WALK");
            getRoute();
          }}
          className="bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition"
        >
          Calculate Walking
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
