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
      <div className="view-event-page max-w-3xl mx-auto mt-10 bg-[var(--card)] text-[var(--card-foreground)] rounded-xl shadow-lg border border-[var(--border)] p-8">
        <h1 className="text-3xl font-bold mb-4 text-[var(--primary)]">
          {event.title}
        </h1>
        <div className="flex items-center gap-3 mb-6">
          <Link
            to={`/view-user/${event.user.id}`}
            className="flex items-center gap-2 hover:underline focus:outline-none"
          >
            {event.user.avatar ? (
              <img
                src={event.user.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : event.user.name ? (
              <span className="w-10 h-10 rounded-full bg-[var(--muted)] flex items-center justify-center font-bold text-lg text-[var(--muted-foreground)]">
                {event.user.name[0].toUpperCase()}
              </span>
            ) : (
              "?"
            )}
            <span className="text-[var(--muted-foreground)] font-medium">
              {event.user.name}
            </span>
          </Link>
          <button
            onClick={handleLike}
            disabled={!sessionUserId || likeLoading}
            className={`ml-4 px-4 py-2 rounded-lg border transition ${
              hasLiked
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                : "bg-[var(--background)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--muted)]"
            }`}
          >
            {hasLiked ? "Unlike" : "Like"} ({likes.length})
          </button>
        </div>
        {event.images && event.images.length > 0 && (
          <div className="mb-6">
            <HorizontalScroll images={event.images} />
          </div>
        )}
        <div className="bg-[var(--background)] rounded-lg border border-[var(--border)] p-6 shadow-sm">
          <div className="mb-2">
            <span className="font-semibold text-[var(--foreground)]">
              Description:
            </span>{" "}
            <span className="text-[var(--muted-foreground)]">
              {event.textDescription || "No description"}
            </span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-[var(--foreground)]">
              Location:
            </span>{" "}
            <span className="text-[var(--muted-foreground)]">
              {event.location?.address || "No location specified"}
            </span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-[var(--foreground)]">
              Time:
            </span>{" "}
            <span className="text-[var(--muted-foreground)]">
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
            </span>
          </div>
          <div>
            <span className="font-semibold text-[var(--foreground)]">
              Tags:
            </span>{" "}
            {event.tags && event.tags.length > 0 ? (
              event.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                  {tag.name}
                </span>
              ))
            ) : (
              <span className="text-[var(--muted-foreground)]">No tags</span>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
