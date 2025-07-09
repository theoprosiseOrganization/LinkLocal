import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserById,
  getUserEvents,
  followUser,
  getSessionUserId,
} from "../../api";
import VerticalEvents from "../VerticalEvents/VerticalEvents";
import Layout from "../Layout/Layout";
import { AlignCenter } from "lucide-react";

export default function ViewUserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [followed, setFollowed] = useState(false);

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

  useEffect(() => {
    async function fetchCurrentUserId() {
      try {
        const id = await getSessionUserId();
        setCurrentUserId(id);
      } catch (e) {
        setCurrentUserId(null);
      }
    }
    fetchCurrentUserId();
  }, []);

  const handleFollow = async (followingId) => {
    if (!currentUserId) return;
    try {
      await followUser(currentUserId, followingId);
      setFollowed(true);
    } catch (e) {
      // Handle error
    }
  };

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
            {currentUserId && currentUserId !== user.id && (
              <button
                className="btn btn-outline"
                onClick={() => handleFollow(user.id)}
                disabled={followed}
                style={{ marginTop: "1rem" }}
              >
                {followed ? "Following" : "Follow"}
              </button>
            )}
          </div>
        </div>
        <h2 className="events-title">{user.name}'s Events</h2>
        <div
          className="events-list"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4rem",
          }}
        >
          <VerticalEvents events={events} />
        </div>
      </div>
    </Layout>
  );
}
