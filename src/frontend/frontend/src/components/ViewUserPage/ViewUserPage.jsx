import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById, getUserEvents } from "../../api";
import VerticalEvents from "../VerticalEvents/VerticalEvents";
import Layout from "../Layout/Layout";

export default function ViewUserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true);
      try {
        const userData = await getUserById(userId);
        setUser(userData);
        const userEvents = await getUserEvents(userId);
        setEvents(userEvents);
      } catch (err) {
        setUser(null);
        setEvents([]);
      }
      setLoading(false);
    }
    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <Layout>
      <div className="view-user-page">
        <div className="profile-card" style={{ marginBottom: "2rem" }}>
          <div className="profile-avatar">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : user.name ? (
              user.name[0].toUpperCase()
            ) : (
              "?"
            )}
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.location && user.location.address}</p>
            {user.tags && user.tags.length > 0 && (
              <div>
                <strong>Preferences:</strong>{" "}
                {user.tags.map((tag) => tag.name).join(", ")}
              </div>
            )}
          </div>
        </div>
        <h2 className="events-title">{user.name}'s Events</h2>
        <VerticalEvents events={events} />
      </div>
    </Layout>
  );
}
