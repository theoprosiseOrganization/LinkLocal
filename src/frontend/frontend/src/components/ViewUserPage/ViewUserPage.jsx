/**
 * ViewUserPage Component
 * Displays user profile and their events.
 * Allows the current user to follow the viewed user.
 *
 * @component
 * @example
 * <ViewUserPage />
 * @returns {JSX.Element} The rendered ViewUserPage component.
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserById,
  getUserEvents,
  followUser,
  getSessionUserId,
  getUserFollowing,
} from "../../api";
import VerticalEvents from "../VerticalEvents/VerticalEvents";
import Layout from "../Layout/Layout";
import HorizontalEvents from "../VerticalEvents/HorizontalEvents";

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
        const currentUserFollowing = await getUserFollowing(id); // use id, not currentUserId
        if (currentUserFollowing.some((u) => u.id === userId)) {
          setFollowed(true);
        }
      } catch (e) {
        setCurrentUserId(null);
      }
    }
    fetchCurrentUserId();
  }, [userId]);

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
      <div className="view-user-page max-w-4xl mx-auto mt-10 bg-[var(--card)] text-[var(--card-foreground)] rounded-xl shadow-lg border border-[var(--border)] p-8">
        <div className="profile-card mb-8 bg-[var(--card)] text-[var(--card-foreground)] rounded-xl shadow border border-[var(--border)] p-8 flex flex-col items-center">
          <div className="profile-avatar mb-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                style={{
                  width: 100,
                  height: 100,
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
          <div className="profile-info text-center">
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">
              {user.name}
            </h2>
            <p className="text-[var(--muted-foreground)] mb-1">{user.email}</p>
            <p className="text-[var(--muted-foreground)] mb-2">
              {user.location && user.location.address}
            </p>
            {user.tags && user.tags.length > 0 && (
              <div className="mb-2">
                <span className="font-semibold text-[var(--foreground)]">
                  Hobbies/Interests:
                </span>{" "}
                <span className="text-[var(--muted-foreground)]">
                  {user.tags.map((tag) => tag.name).join(", ")}
                </span>
              </div>
            )}
            {currentUserId && currentUserId !== user.id && (
              <button
                className="bg-[var(--primary)] text-[var(--primary-foreground)] border border-[var(--primary)] rounded-lg px-4 py-2 mt-2 hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition"
                onClick={() => handleFollow(user.id)}
                disabled={followed}
              >
                {followed ? "Following" : "Follow"}
              </button>
            )}
          </div>
        </div>
        <h2 className="events-title text-2xl font-bold text-[var(--primary)] mb-6 text-center">
          {user.name}'s Events
        </h2>
        <div className="events-list flex justify-center items-center w-70% px-4">
          <HorizontalEvents events={events} />
        </div>
      </div>
    </Layout>
  );
}
