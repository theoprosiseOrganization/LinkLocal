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
import React, { use, useEffect, useState } from "react";
import { Button } from "../../../components/ui/Button";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import {
  getUserFollowers,
  getUserFollowing,
  getSessionUserId,
} from "../../api";

export default function HomePage() {
  const [eventsToDisplay, setEventsToDisplay] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userFilter, setUserFilter] = useState("none"); // Default to no users - can be "followers", "following", "all" or "none"
  const [loading, setLoading] = useState(false); // Loading state for events
  const [usersToDisplay, setUsersToDisplay] = useState([]); // State to hold users based on filter

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

  useEffect(() => {
      const fetchUserData = async () => {
        setLoading(true); // Start loading
        try {
          const userId = await getSessionUserId();
          let people = [];
          if (userFilter === "followers") {
            people = await getUserFollowers(userId);
          }
          if (userFilter === "following") {
            people = await getUserFollowing(userId);
          }
          if (userFilter === "all") {
            people = await getUserFollowers(userId);
            people = people.concat(await getUserFollowing(userId));
          }
          setUsersToDisplay(people);
        } catch (err) {
          setUsersToDisplay([]);
        } finally {
          setLoading(false); // End loading
        }
      };
      fetchUserData();
    }, [userFilter]);


  return (
    <Layout>
      <div className="homepage-vertical">
        <div className="homepage-bottom-overlay">
          <MapComponent
            events={eventsToDisplay}
            currentLocation={currentLocation}
            users={usersToDisplay}
          />
          {showOverlay && (
            <div className="homepage-overlay">
              <div className="vertical-events-container">
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-8"
                  onClick={() => {
                    setSidebarOpen(true);
                    setShowOverlay(false);
                  }}
                >
                  <ChevronRightIcon />
                </Button>

                <h2 className="text-xl font-bold mb-4 text-[var(--primary)] text-center">
                  View Some Nearby Events
                </h2>

                <HorizontalEvents events={eventsToDisplay} />
              </div>
            </div>
          )}
          {sidebarOpen && (
            <div className="sidebar-overlay">
              <Button
                variant="secondary"
                size="icon"
                className="close-sidebar"
                onClick={() => {
                  setSidebarOpen(false);
                  setShowOverlay(true);
                }}
              >
               <ChevronLeftIcon />
              </Button>
              <div>
                <h3>Filter Map</h3>
                <div
                  style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
                >
                  <Button
                    variant={
                      userFilter === "followers" ? "primary" : "secondary"
                    }
                    onClick={() => setUserFilter("followers")}
                  >
                    Show Followers
                  </Button>
                  <Button
                    variant={
                      userFilter === "following" ? "primary" : "secondary"
                    }
                    onClick={() => setUserFilter("following")}
                  >
                    Show Following
                  </Button>
                  <Button
                    variant={userFilter === "all" ? "primary" : "secondary"}
                    onClick={() => setUserFilter("all")}
                  >
                    Show All
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
