import NavHeader from "../NavHeader/NavHeader";
import React, { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <NavHeader />
      <button
        style={{
          position: "fixed",
          top: 10,
          right: 20,
          zIndex: 1000,
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          background: "var(--color-primary)",
          color: "var(--color-primary-foreground)",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => setDarkMode((prev) => !prev)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? "🌙 Dark" : "☀️ Light"}
      </button>
      <main style={{ paddingTop: "50px" }}>{children}</main>
    </>
  );
}