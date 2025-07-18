/**
 * HomePage Component
 *
 * This component serves as the main landing page of the application.
 * It displays a map on the left side and a list of events on the right side.
 * It currently displays all events fetched from the API.
 * The map shows the user's current location if available.
 * The events are displayed in a horizontal list format.
 * 
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
  const [currentLocation, setCurrentLocation] = useState(null);

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          // Handle error or fallback
        }
      );
    }
  }, []);
  return (
    <Layout>
      <div className="homepage-vertical">
        <div className="homepage-bottom-overlay">
          <MapComponent events={eventsToDisplay} currentLocation={currentLocation}/>
          <div className="homepage-overlay">
            <div className="vertical-events-container">
              <h2 className="text-xl font-bold mb-4 text-[var(--primary)] text-center">
                View Some Nearby Events
              </h2>
              <HorizontalEvents events={eventsToDisplay} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
