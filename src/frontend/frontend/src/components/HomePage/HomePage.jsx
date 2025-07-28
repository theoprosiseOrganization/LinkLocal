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
import { getAllEvents, getEventsWithinRadius } from "../../api";
import React, { use, useEffect, useState } from "react";
import { Button } from "../../../components/ui/button.jsx";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import {
  getUserFollowers,
  getUserFollowing,
  getSessionUserId,
} from "../../api";
import { useUserLocation } from "../../Context/UserLocationContext";

export default function HomePage() {
  const [eventsToDisplay, setEventsToDisplay] = useState([]);
  const [showOverlay, setShowOverlay] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userFilter, setUserFilter] = useState("none"); // Default to no users - can be "followers", "following", "all" or "none"
  const [loading, setLoading] = useState(false); // Loading state for events
  const [usersToDisplay, setUsersToDisplay] = useState([]); // State to hold users based on filter
  const { userLocation: currentLocation } = useUserLocation(); // Get user location from context
  const [radiusKM, setRadiusKM] = useState(5); // Default radius for events
  const [radiusFilter, setRadiusFilter] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (radiusFilter && currentLocation) {
        setLoading(true); // Start loading
        try {
          const events = await getEventsWithinRadius(
            currentLocation,
            radiusKM * 1000
          );
          setEventsToDisplay(events);
        } catch {
          setEventsToDisplay([]);
        } finally {
          setLoading(false); // End loading
        }
      } else {
        try {
          const events = await getAllEvents();
          setEventsToDisplay(events);
        } catch (err) {
          setEventsToDisplay([]);
        }
      }
    };
    fetch();
  }, [currentLocation, radiusFilter, radiusKM]);

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

  useEffect(() => {
    async function checkLogin() {
      const userId = await getSessionUserId();
      setIsLoggedIn(!!userId);
    }
    checkLogin();
  }, []);

  return (
    <Layout>
      <div className="homepage-vertical">
        <div className="homepage-bottom-overlay">
          <MapComponent
            events={eventsToDisplay}
            currentLocation={currentLocation}
            users={usersToDisplay}
          />
          <div
            className={
              "homepage-overlay " + (showOverlay ? "is-open" : "is-closed")
            }
          >
            <div className="vertical-events-container">
              <Button
                variant="secondary"
                size="icon"
                className="size-8"
                onClick={() => {
                  if (isLoggedIn) {
                    setSidebarOpen(true);
                    setShowOverlay(false);
                  } else {
                    alert("Please log in to access sidebar features.");
                  }
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
          <div
            className={
              "sidebar-overlay " + (sidebarOpen ? "is-open" : "is-closed")
            }
          >
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
              <div className="mb-4">
                <label htmlFor="radius" className="block mb-1">
                  Show Events Within Radius (KM): {radiusKM}
                </label>
                <input
                  id="radius"
                  type="range"
                  min={1}
                  max={50}
                  step={1}
                  value={radiusKM}
                  onChange={(e) => setRadiusKM(Number(e.target.value))}
                />
                <div className="mt-2">
                  <label>
                    <input
                      type="checkbox"
                      checked={radiusFilter}
                      onChange={() => setRadiusFilter((f) => !f)}
                    />
                    Enable Radius Filter
                  </label>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <Button
                  variant={userFilter === "followers" ? "primary" : "secondary"}
                  onClick={() => setUserFilter("followers")}
                >
                  Show Followers
                </Button>
                <Button
                  variant={userFilter === "following" ? "primary" : "secondary"}
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
        </div>
      </div>
    </Layout>
  );
}
