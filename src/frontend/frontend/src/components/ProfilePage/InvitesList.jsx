/**
 * InvitesList component displays a list of invitations
 * received by the user. Each invitation shows the plan title and a button to view the plan.
 * If there are no invitations, a message is displayed.
 *
 * @component
 * @example
 * <InvitesList />
 * @returns {JSX.Element} The rendered InvitesList component.
 */
import { useEffect, useState } from "react";
import { getMyInvitations } from "../../api";
import { Link } from "react-router-dom";

export default function InvitesList() {
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    getMyInvitations().then(setInvites);
  }, []);

  if (invites.length === 0) {
    return (
      <div className="text-center text-[var(--muted-foreground)] py-8">
        No invites found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invites.map((invite) => (
        <Link to={`/plan/${invite.plans.id}`} key={invite.id}>
          <div
            key={invite.id}
            className="flex items-center justify-between bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] rounded-xl shadow p-4"
          >
            <span className="font-semibold text-[var(--primary)]">
              {invite.plans.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
