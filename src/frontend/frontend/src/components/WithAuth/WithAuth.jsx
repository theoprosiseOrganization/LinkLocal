/**
 * Higher-order component (HOC) that checks user authentication status before rendering its children.
 *
 * It sends a request to the `/auth/me` endpoint to verify if the user is authenticated.
 * If authenticated, it renders the child components; otherwise, it redirects to the sign-in page.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render if authenticated.
 * @returns {React.ReactNode} The rendered children if authenticated, a loading indicator while checking, or null if not authenticated.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WithAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_DB_URL || "http://localhost:3000"}/auth/me`,
      {
        method: "POST",
        credentials: "include",
      }
    )
      .then((res) => {
        if (res.ok) {
          setAuthed(true);
        } else {
          navigate("/signin");
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (!authed) return null;
  return children;
}
