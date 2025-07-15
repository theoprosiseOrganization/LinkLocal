import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

export default function ViewPlanButton({ planId }) {
  return (
    <Link to={`/plan/${planId}`}>
      <Button variant="link" className="event-card-button">
        View Plan
      </Button>
    </Link>
  );
}
