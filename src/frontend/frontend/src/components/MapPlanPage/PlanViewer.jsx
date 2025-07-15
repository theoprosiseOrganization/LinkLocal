import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { getPlanById } from "../../api";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import Route from "./Route";

export default function PlanViewer() {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    getPlan(planId)
      .then(setPlan)
      .catch(() => alert("Failed to load plan"));
  }, [planId]);

  if (!plan) return <div>Loading...</div>;

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        defaultZoom={10}
        defaultCenter={{
          lat: plan.route_data.viewport.high.lat,
          lng: plan.route_data.viewport.high.lng,
        }}
      >
        {routeData && <Route route={routeData} />}
      </Map>
    </APIProvider>
  );
}
