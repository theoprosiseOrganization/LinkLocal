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