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
import { getPlanById, getEventById } from "../../api";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Route from "./Route";
import Layout from "../Layout/Layout";
import UserLocationMarker from "../MapComponent/UserLocationMarker";

export default function PlanViewer() {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getPlanById(planId)
      .then(setPlan)
      .catch(() => alert("Failed to load plan"));
  }, [planId]);

  const durations = plan?.durations || {};

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
  }, [plan,events]);

  if (!plan) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="map-plan-page relative w-full max-w-5xl mx-auto mt-10 bg-[var(--card)] text-[var(--card-foreground)] rounded-xl shadow-lg border border-[var(--border)] overflow-hidden h-auto">
        {" "}
        <div
          className="absolute top-0 left-0 w-full bg-[var(--primary)] bg-opacity-90 text-[var(--primary-foreground)] py-6 text-center z-10 text-2xl font-bold tracking-wide rounded-t-xl shadow"
          style={{ paddingTop: "4rem" }}
        >
          {plan.title || "Plan Title"}
        </div>
        <div className="h-[75vh] w-full rounded-lg overflow-hidden">
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
      <div className="event-list bg-white rounded-b-xl shadow-inner p-6">
        <h2 className="text-xl font-semibold mb-4">Stops on This Plan</h2>
        <ol className="list-decimal ml-6">
          {(orderedEvents || []).map((event, idx) => (
            <li key={event.id || idx} className="mb-2">
              <div className="font-bold">{event.title}</div>
            </li>
          ))}
        </ol>
      </div>
    </Layout>
  );
}
