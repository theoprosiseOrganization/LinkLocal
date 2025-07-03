import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import { getUserById, getEventById } from "../../api";

export default function ViewEventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const fetchedEvent = await getEventById(eventId);
        if (fetchedEvent) {
          const user = await getUserById(fetchedEvent.userId);
          fetchedEvent.user = user; // Attach user data to the event
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
  }, [eventId]);

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
        <div className="profile-avatar">
          {event.user.avatar ? (
            <img
              src={event.user.avatar}
              alt="Profile"
              style={{
                width: 80,
                height: 80,
                borderRadius: "80%",
                objectFit: "cover",
              }}
            />
          ) : event.user.name ? (
            event.user.name[0].toUpperCase()
          ) : (
            "?"
          )}
        </div>
        <p className="mb-4 text-gray-400">{event.user.name}</p>
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
        </div>
        {/* Add more event details as needed */}
      </div>
    </Layout>
  );
}
