/**
 * Layout component for the application.
 * It includes a navigation header and manages dark mode state.
 * The dark mode preference is stored in local storage and applied to the body element.
 * 
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout component with navigation header and main content area
 */
import NavHeader from "../NavHeader/NavHeader";
import React, { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme === "dark";
    }
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
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
      <NavHeader darkMode={darkMode} setDarkMode={setDarkMode} />
      <main style={{ paddingTop: "50px" }}>{children}</main>
    </>
  );
}