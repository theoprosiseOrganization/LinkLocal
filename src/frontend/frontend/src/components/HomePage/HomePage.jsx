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
import Map from "../Map/Map";
import "./HomePage.css"; 
import VerticalEvents from "../VerticalEvents/VerticalEvents";
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
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <Layout>
      <div className="homepage-split">
        <div className="homepage-left">
          <Map />
        </div>
        <div className="homepage-right">
          <VerticalEvents events={eventsToDisplay} />
        </div>
      </div>
    </Layout>
  );
}