/**
 * EventCard Component
 *
 * This component displays a card for an event with its title, description, and location.
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
import { Button } from "../../../components/ui/button";
import "./EventCard.css";

export default function EventCard({ event }) {
  if (!event) return null;
  return (
    <Card className="event-card">
      <CardHeader>
        <CardTitle>{event.title || "Untitled Event"}</CardTitle>
        <CardDescription>
          {event.textDescription || "No description"}
        </CardDescription>
        <CardAction>
          <Button variant="link" className="event-card-button">
            View Event
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{event.location || "No location"}</p>
      </CardContent>
    </Card>
  );
}
