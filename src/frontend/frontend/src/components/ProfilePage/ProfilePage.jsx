import Layout from "../Layout/Layout";
import CreateEventButton from "../CreateEventPage/CreateEventButton";
import VerticalEvents from "../VerticalEvents/VerticalEvents";
import "./ProfilePage.css";
import { getUserById, getUserEvents, getSessionUserId } from "../../../src/api";
import React, { use, useEffect, useState } from "react";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await getSessionUserId();
        const user = await getUserById(userId);
        setUserData(user);
        const events = await getUserEvents(userId);
        setUserEvents(events);
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
          <VerticalEvents events={userEvents} />
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
