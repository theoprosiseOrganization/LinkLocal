import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";

export default function ViewEventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_DB_URL || "http://localhost:3000"
          }/events/${eventId}`,
          { credentials: "include" }
        );
        if (res.ok) {
          const data = await res.json();
          setEvent(data);
        }
      } catch (err) {
        // handle error
      }
      setLoading(false);
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
        <p className="mb-4 text-gray-400">{event.textDescription}</p>
        {event.images && event.images.length > 0 && (
          <HorizontalScroll images={event.images} />
        )}
        <div className="mt-4">
          <strong>Location:</strong>{" "}
          {event.location?.address || "No location specified"}
        </div>
        {/* Add more event details as needed */}
      </div>
    </Layout>
  );
}
