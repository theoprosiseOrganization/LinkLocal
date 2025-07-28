/**
 * PlanViewer Component
 * Displays a map with a route based on the plan data fetched by ID.
 * Uses Google Maps API to render the map and route.
 *
 * @component
 * @returns {JSX.Element} The rendered PlanViewer component.
 * @example
 * <PlanViewer />
 */
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getPlanById,
  getEventById,
  getSessionUserId,
  joinPlan,
  shufflePlan,
} from "../../api";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Route from "./Route";
import Layout from "../Layout/Layout";
import UserLocationMarker from "../MapComponent/UserLocationMarker";
import { Button } from "../../../components/ui/button.jsx";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../components/ui/Hover-Card";

export default function PlanViewer() {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);
  const [events, setEvents] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    (async () => {
      const p = await getPlanById(planId);
      setPlan(p);
      const userId = await getSessionUserId();
      setHasJoined((p.participants || []).includes(userId));
    })();
  }, [planId]);

  const durations = plan?.durations || {};
  const drivingTimes = plan?.driving_times || {};

  // Fetch events when plan is loaded
  useEffect(() => {
    if (plan && plan.event_ids && plan.event_ids.length > 0) {
      Promise.all(plan.event_ids.map((id) => getEventById(id)))
        .then(setEvents)
        .catch(() => alert("Failed to load events"));
    }
  }, [plan]);

  const orderedEvents = React.useMemo(() => {
    const idx = plan?.route_data?.optimizedIntermediateWaypointIndex;
    if (idx && idx.length == events.length) {
      return idx.map((i) => events[i]).filter(Boolean);
    }
    return events;
  }, [plan, events]);

  if (!plan) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="map-plan-page relative w-full max-w-5xl mx-auto mt-10 bg-[var(--card)] text-[var(--card-foreground)] rounded-xl shadow-lg border border-[var(--border)] overflow-hidden h-auto">
        <div className="flex w-full bg-[var(--primary)] bg-opacity-90 text-[var(--primary-foreground)] py-6 px-8 z-10 rounded-t-xl shadow items-center justify-between">
          <div className="text-2xl font-bold tracking-wide flex-1 text-left">
            <h1>{plan.title || "Plan Title"}</h1>
            {!hasJoined ? (
              <Button
                variant="secondary"
                className="btn-primary ml-4"
                onClick={async () => {
                  await joinPlan(planId);
                  setHasJoined(true);
                  const updated = await getPlanById(planId);
                  setPlan(updated);
                  alert("You have joined the plan!");
                }}
              >
                Accept Invite
              </Button>
            ) : (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="secondary"
                    onClick={async () => {
                      const reshuffled = await shufflePlan(planId);
                      setPlan(reshuffled);
                      alert("Plan has been reshuffled!");
                      window.location.reload(); // Reload to reflect changes
                    }}
                  >
                    Shuffle Plan
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64">
                  <p className="text-sm">
                    Regenerate the events in this plan based on your preferences
                    as well as the preferences of the creator.
                  </p>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
          <div className="flex-1 text-right">
            <h2 className="text-xl font-semibold mb-2">Stops on This Plan</h2>
            <ul className="inline-block text-left max-h-48 overflow-y-auto pr-2">
              {(orderedEvents || []).map((event, idx) => {
                // For all but the last event, show driving time to the next event
                const isLast = idx === orderedEvents.length - 1;
                const nextEvent = orderedEvents[idx + 1];
                const drivingTimeToNext =
                  !isLast &&
                  drivingTimes &&
                  nextEvent &&
                  drivingTimes[nextEvent.id]
                    ? Math.round(drivingTimes[nextEvent.id] / 60000)
                    : null;
                const eventDuration =
                  durations && durations[event.id]
                    ? Math.round(durations[event.id] / 60000)
                    : 60;
                return (
                  <React.Fragment key={event.id || idx}>
                    <li className="mb-1 flex items-center">
                      <span className="font-bold mr-2">{idx + 1}.</span>
                      <span className="font-bold">{event.title}</span>
                      {/* Show driving time to next event, except for the last event */}
                      {!isLast && drivingTimeToNext !== null && (
                        <span className="ml-2 text-xs text-gray-500">
                          ({drivingTimeToNext} min drive to next)
                        </span>
                      )}
                      <span className="ml-2 text-sm">{eventDuration} min</span>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="h-[75vh] w-full rounded-b-xl overflow-hidden">
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
              mapId="4f917a8c04fdd7367b6986a1"
              defaultZoom={4}
              mapTypeControl={false}
              fullscreenControl={false}
              streetViewControl={false}
              defaultCenter={{
                lat: plan.route_data?.viewport?.high?.latitude,
                lng: plan.route_data?.viewport?.high?.longitude,
              }}
            >
              {plan.route_data && (
                <Route route={plan.route_data} event_ids={plan.event_ids} />
              )}
              <UserLocationMarker />
            </Map>
          </APIProvider>
        </div>
      </div>
    </Layout>
  );
}
