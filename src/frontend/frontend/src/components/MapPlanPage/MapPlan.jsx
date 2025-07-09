/**
 *
 */

import Layout from "../Layout/Layout";
import MapWithDrawing from "./MapWithDrawing";
import "./MapPlan.css"

export default function MapPlan() {
  return (
    <Layout>
      <div className="map-plan-page">
        <h1>Map Plan Page</h1>
          <MapWithDrawing />
      </div>
    </Layout>
  );
}
