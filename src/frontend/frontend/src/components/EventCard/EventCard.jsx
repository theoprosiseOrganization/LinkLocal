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

export default function EventCard({ eventIndex }) {
  return (
    <Card className="event-card">
      <CardHeader>
        <CardTitle>Event Title {eventIndex}</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>
          <Button variant="link" className="event-card-button">View Event</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  );
}
