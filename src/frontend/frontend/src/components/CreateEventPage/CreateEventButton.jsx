/**
 *  CreateEventButton.jsx
 *  This component renders a button that navigates to the Create Event page.
 *
 * @component CreateEventButton
 * @example
 * <CreateEventButton />
 * @returns {JSX.Element} A button that links to the Create Event page.
 */

import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

export default function CreateEventButton() {
  return (
    <Link to="/create-event">
      <Button className="create-event-button">Create Event</Button>
    </Link>
  );
}
