/**
 * HomePage Component
 *
 * This component serves as the main landing page of the application.
 * It displays a map on the left side and a list of events on the right side.
 * It currently displays all events fetched from the API.
 * The map is currently a placeholder and will be replaced with an actual map implementation.
 *
 * @component
 * @example
 * <HomePage />
 * * @returns {JSX.Element} The rendered HomePage component.
 */

import Layout from "../Layout/Layout";
import MapComponent from "../MapComponent/MapComponent";
import "./HomePage.css";
import HorizontalEvents from "../VerticalEvents/HorizontalEvents";
import { getAllEvents } from "../../api";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [eventsToDisplay, setEventsToDisplay] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getAllEvents();
        setEventsToDisplay(events);
      } catch (error) {
        setEventsToDisplay([]); // If there's an error, set to empty array
      }
    };
    fetchEvents();
  }, []);

  return (
    <Layout>
      <div className="homepage-vertical">
        <div className="homepage-top">
          <h1>Welcome to LinkLocal!</h1>
        </div>
        <div className="homepage-bottom-overlay">
          <MapComponent events={eventsToDisplay} />
          <div className="homepage-overlay">
            <div className="vertical-events-container">
              <h2>View Some Nearby Events</h2>
              <HorizontalEvents events={eventsToDisplay} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
