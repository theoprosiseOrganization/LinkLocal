/**
 * ViewEventPage.jsx
 *
 * This component displays the details of a specific event, including the title, description,
 * location, and images. It fetches the event data from an API using the event ID
 * from the URL parameters. If the event is found, it displays the event details along with
 * the user's profile information who created the event. If the event is not found or still loading
 * , it shows appropriate messages.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.eventId - The ID of the event to view.
 * @example
 * <ViewEventPage />
 * @returns {JSX.Element} The rendered ViewEventPage component.
 */

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import {
  getUserById,
  getEventById,
  getSessionUserId,
  likeEvent,
  unlikeEvent,
  getEventLikes,
} from "../../api";

export default function ViewEventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionUserId, setSessionUserId] = useState(null);
  const [likes, setLikes] = useState([]);
  const [likeLoading, setLikeLoading] = useState(false);

  async function fetchLikes() {
    try {
      const likesList = await getEventLikes(eventId);
      setLikes(likesList);
    } catch {
      setLikes([]);
    }
  }

  /**
   * This effect fetches the event data by its ID when the component mounts.
   * It retrieves the event details and the user who created the event.
   * If the event is found, it sets the event state with the fetched data.
   * If the event is not found or an error occurs, it sets the event state to null.
   * The loading state is used to show a loading message while the data is being fetched
   */
  useEffect(() => {
    async function fetchEvent() {
      try {
        const fetchedEvent = await getEventById(eventId);
        if (fetchedEvent) {
          const user = await getUserById(fetchedEvent.userId);
          fetchedEvent.user = user;
          setEvent(fetchedEvent);
        } else {
          setEvent(null);
        }
      } catch (error) {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
    fetchLikes();
    getSessionUserId()
      .then(setSessionUserId)
      .catch(() => setSessionUserId(null));
  }, [eventId]);

  const hasLiked = sessionUserId && likes.some((u) => u.id === sessionUserId);

  const handleLike = async () => {
    if (!sessionUserId) return;
    setLikeLoading(true);
    try {
      if (hasLiked) {
        await unlikeEvent(eventId, sessionUserId);
      } else {
        await likeEvent(eventId, sessionUserId);
      }
      await fetchLikes(); // Always refresh likes from backend
    } catch (e) {
      // Optionally show error
    } finally {
      setLikeLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="view-event-page">
          <h1>Loading event...</h1>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="view-event-page">
          <h1>Event not found</h1>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="view-event-page max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
        <div className="flex items-center gap-2 mb-4">
          <Link
            to={`/view-user/${event.user.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              gap: "0.5rem",
              cursor: "pointer",
            }}
            className="hover:underline focus:outline-none"
          >
            {event.user.avatar ? (
              <img
                src={event.user.avatar}
                alt="Profile"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : event.user.name ? (
              <span
                style={{
                  display: "inline-flex",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#ccc",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {event.user.name[0].toUpperCase()}
              </span>
            ) : (
              "?"
            )}
            <span className="text-gray-400">{event.user.name}</span>
          </Link>
          <button
            onClick={handleLike}
            disabled={!sessionUserId || likeLoading}
            className={`ml-4 px-3 py-1 rounded ${
              hasLiked ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {hasLiked ? "Unlike" : "Like"} ({likes.length})
          </button>
        </div>
        {event.images && event.images.length > 0 && (
          <HorizontalScroll images={event.images} />
        )}
        <div className="mt-4">
          <div>
            <strong>Description:</strong>{" "}
            {event.textDescription || "No description"}
          </div>
          <div>
            <strong>Location:</strong>{" "}
            {event.location?.address || "No location specified"}
          </div>
          <div>
            <strong>Time:</strong>{" "}
            {event.startTime && event.endTime ? (
              <>
                {new Date(event.startTime).toLocaleString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                &ndash;{" "}
                {new Date(event.endTime).toLocaleString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </>
            ) : (
              "No time specified"
            )}
          </div>
          <div>
            <strong>Tags:</strong>{" "}
            {event.tags && event.tags.length > 0
              ? event.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                  >
                    {tag.name}
                  </span>
                ))
              : "No tags"}
          </div>
        </div>
      </div>
    </Layout>
  );
}
