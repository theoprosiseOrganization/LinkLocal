import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
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
        <CardDescription>{event.description || "No description"}</CardDescription>
        <CardAction>
          <Button variant="link" className="event-card-button">View Event</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{event.location || "No location"}</p>
      </CardContent>
    </Card>
  );
}