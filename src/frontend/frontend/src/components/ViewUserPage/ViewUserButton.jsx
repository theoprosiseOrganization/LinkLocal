/**
 *  ViewUserButton.jsx
 *  This component renders a button that navigates to the View User page.
 *
 * @component ViewUserButton
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.userId - The ID of the user to view.
 * @example
 * <ViewUserButton />
 * @returns {JSX.Element} A button that links to the View Event page.
 */

import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/Button";

export default function ViewEventButton({ userId }) {
  return (
    <Link to={`/view-user/${userId}`}>
      <Button variant="link" className="user-button">
        View User
      </Button>
    </Link>
  );
}
