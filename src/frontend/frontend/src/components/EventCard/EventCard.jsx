/**
 * EventCard Component
 *
 * This component displays a card for an event with its title, description, images, and location.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.event - The event object containing details like title, description,
 * location, and images.
 * @returns {JSX.Element} The rendered EventCard component.
 */

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import "./EventCard.css";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import ViewEventButton from "../ViewEventPage/ViewEventButton";

export default function EventCard({ event }) {
  if (!event) return null;

  return (
    <Card className="event-card w-full max-w-xl min-w-[250px] mx-auto">
      <CardHeader>
        <CardTitle>{event.title || "Untitled Event"}</CardTitle>
        <CardDescription>
          {event.textDescription || "No description"}
        </CardDescription>
        <CardAction>
          <ViewEventButton eventId={event.id} />
        </CardAction>
      </CardHeader>
      <CardContent>
        {event.images && event.images.length > 0 ? (
          <HorizontalScroll images={event.images} />
        ) : (
          <p>No images available</p>
        )}
        <p>{event.location.address || "No location"}</p>
      </CardContent>
    </Card>
  );
}
