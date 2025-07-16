import NavHeader from "../NavHeader/NavHeader";
import React, { useEffect, useState } from "react";
import { Switch } from "../../../components/ui/switch";
import { Label } from "../../../components/ui/label";

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
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 20,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "var(--color-primary)",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
      }}
    >
      <Label htmlFor="dark-mode" style={{ color: "var(--color-primary-foreground)" }}>
        {darkMode ? "Dark" : "Light"}
      </Label>
      <Switch
        id="dark-mode"
        checked={darkMode}
        onCheckedChange={setDarkMode}
        aria-label="Toggle dark mode"
      />
    </div>
    <main style={{ paddingTop: "50px" }}>{children}</main>
  </>
);
}