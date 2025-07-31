/**
 * LogList Component
 * This component fetches and displays a list of logs from the server.
 * It uses the `getLogs` API function to retrieve the logs and displays them in a
 * styled list format.
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
  const [expanded, setExpanded] = useState(null);

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
          className="flex flex-col bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] rounded-xl shadow p-4 mb-4"
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[var(--primary)]">
              {new Date(log.date).toLocaleString()}
            </span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {log.method}
            </span>
            <span className="text-xs text-gray-500">{log.url}</span>
            <button
              className="ml-2 text-xs underline"
              onClick={() => setExpanded(expanded === idx ? null : idx)}
            >
              {expanded === idx ? "Hide Details" : "Show Details"}
            </button>
          </div>
          {expanded === idx && (
            <div className="mt-2 text-sm">
              <div>
                <strong>Headers:</strong>
                <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap break-words">
                  {log.headers}
                </pre>
              </div>
              <div>
                <strong>Body:</strong>
                <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                  {log.body}
                </pre>
              </div>
              <div>
                <strong>Params:</strong>
                <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                  {log.params}
                </pre>
              </div>
              <div>
                <strong>Query:</strong>
                <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                  {log.query}
                </pre>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
