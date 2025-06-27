import Layout from "../Layout/Layout";
import CreateEventButton from "../CreateEventPage/CreateEventButton";
import VerticalEvents from "../VerticalEvents/VerticalEvents";
import "./ProfilePage.css";
import { getUserById, getUserEvents } from "../../../src/api";
import React, { use, useEffect, useState } from "react";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get userId from session
        const res = await fetch(
          `${
            import.meta.env.VITE_API_DB_URL || "http://localhost:3000"
          }/auth/me`,
          { method: "POST", credentials: "include" }
        );
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        const userId = data.userId;

        // Fetch user data by ID
        const user = await getUserById(userId);
        setUserData(user);

        // Fetch user events
        const events = await getUserEvents(userId);
        setUserEvents(events);
        console.log("User Events:", userEvents);
      } catch (err) {
        setUserData(null);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Layout>
      <div className="homepage-split">
        <div className="homepage-left">
          Your Events
          <VerticalEvents />
          <CreateEventButton />
        </div>
        <div className="homepage-right">
          {userData ? (
            <div>
              <h2>{userData.name}</h2>
              <p>Email: {userData.email}</p>
              <p>Location: {userData.location}</p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <div>Loading profile...</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
