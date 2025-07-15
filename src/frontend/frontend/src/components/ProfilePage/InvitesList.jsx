import { useEffect, useState } from "react";
import { getMyInvitations } from "../../api";
import ViewPlanButton from "../MapPlanPage/ViewPlanButton";

export default function InvitesList() {
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    getMyInvitations().then(setInvites);
  }, []);
  if (invites.length === 0) {
    return <div className="text-center text-gray-500">No invites found.</div>;
  }
  return (
    <div className="space-y-4">
      {invites.map((invite) => (
        <div key={invite.id} className="p-4 border rounded-md shadow-sm">
          <span>
            <strong>{invite.plans.title}</strong>
          </span>
          <ViewPlanButton planId={invite.plans.id} />
        </div>
      ))}
    </div>
  );
}
