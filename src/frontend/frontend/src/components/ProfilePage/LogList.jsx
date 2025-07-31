/**
 *
 *
 * @component
 * @example
 * <LogList />
 * @returns {JSX.Element} The rendered LogList component.
 */
import { useEffect, useState } from "react";
import { getLogs } from "../../api/";

export default function LogList() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const data = await getLogs();
        setLogs(data.logs || []);
      } catch (err) {
        setLogs([]);
      }
    }
    fetchLogs();
  }, []);

  if (logs.length === 0) {
    return (
      <div className="text-center text-[var(--muted-foreground)] py-8">
        No logs found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] rounded-xl shadow p-4 mb-4"
        >
          <span className="font-semibold text-[var(--primary)]">
            {log.date}
          </span>
        </div>
      ))}
    </div>
  );
}
