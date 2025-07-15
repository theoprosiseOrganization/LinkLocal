import { useEffect, useState } from "react";
import { getInvitations } from "../../api";
import { Button } from "../../../components/ui/button";

export default function InvitesList() {
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    getInvitations().then(setInvites);
  }, []);
  if (invites.length === 0) {
    return <div className="text-center text-gray-500">No invites found.</div>;
  }
  return (
    <div className="space-y-4">
      {invites.map((invite) => (
        <div key={invite.id} className="p-4 border rounded-md shadow-sm">
            <span><strong>{invite.plans.title}</strong></span>
          <Button>View Plan</Button>
        </div>
      ))}
    </div>
  );
}
