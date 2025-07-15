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
import { getPlanById } from "../../api";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Route from "./Route";
import Layout from "../Layout/Layout";

export default function PlanViewer() {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    getPlanById(planId)
      .then(setPlan)
      .catch(() => alert("Failed to load plan"));
  }, [planId]);

  if (!plan) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="map-plan-page" style={{ height: "100vh", width: "100%" }}>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map
            mapId="4f917a8c04fdd7367b6986a1"
            defaultZoom={4}
            defaultCenter={{
              lat: plan.route_data?.viewport?.high?.latitude,
              lng: plan.route_data?.viewport?.high?.longitude,
            }}
          >
            {plan.route_data && (
              <Route route={plan.route_data} event_ids={plan.event_ids} />
            )}
          </Map>
        </APIProvider>
      </div>
    </Layout>
  );
}
