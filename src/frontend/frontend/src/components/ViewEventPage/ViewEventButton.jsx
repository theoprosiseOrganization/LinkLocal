/**
 *  ViewEventButton.jsx
 *  This component renders a button that navigates to the View Event page.
 *
 * @component ViewEventButton
 * @example
 * <ViewEventButton />
 * @returns {JSX.Element} A button that links to the View Event page.
 */

import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/Button";

export default function ViewEventButton({ eventId }) {
  return (
    <Link to={`/view-event/${eventId}`}>
      <Button variant="link" className="event-card-button">
        View Event
      </Button>
    </Link>
  );
}
