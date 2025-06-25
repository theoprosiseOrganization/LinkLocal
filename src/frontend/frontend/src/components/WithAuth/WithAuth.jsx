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
