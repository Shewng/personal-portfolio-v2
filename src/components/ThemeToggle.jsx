import React, { useState, useEffect } from "react";

// More themes to toggle
//const themes = [
//  { name: "base", text: "base" },
//  { name: "sunrise", text: "🌅" },
//  { name: "day", text: "☀️" },
//  { name: "sunset", text: "🌆" },
//  { name: "night", text: "🌑" },
//];

const themes = [{ name: "light" }, { name: "dark" }];

const ThemeToggle = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(null);

  // Initialize theme on clinet side
  useEffect(() => {
    const getInitialTheme = () => {
      const savedTheme = localStorage.getItem("theme");

      // Find saved theme in the themes array
      if (savedTheme) {
        const themeIndex = themes.findIndex(
          (theme) => theme.name === savedTheme
        );
        if (themeIndex != -1) return themeIndex;
      }
      return 0; // default to base
    };

    setCurrentThemeIndex(getInitialTheme());
  }, []);

  useEffect(() => {
    if (currentThemeIndex != null) {
      const currentTheme = themes[currentThemeIndex];

      // Remove all theme classes
      themes.forEach((theme) => {
        document.documentElement.classList.remove(theme.name);
      });

      // Add current theme
      document.documentElement.setAttribute("data-theme", currentTheme.name);
      document.documentElement.classList.add(currentTheme.name);
      localStorage.setItem("theme", currentTheme.name);
    }
  }, [currentThemeIndex]);

  const toggleTheme = () => {
    setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
  };

  // Enable this, plus the array items to have more theme toggles
  //const currentTheme = themes[currentThemeIndex];
  //const nextTheme = themes[(currentThemeIndex + 1) % themes.length];

  return (
    <button
      onClick={toggleTheme}
      className="link nightlight"
      aria-label={`switch theme`}
      title={`click to transition`}
      style={{ top: "-1px" }}
    >
      ☀
    </button>
  );
};

export default ThemeToggle;
