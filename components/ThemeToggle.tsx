"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

interface ThemeToggleProps {
  compact?: boolean;
}

const ThemeToggle = ({ compact = false }: ThemeToggleProps) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return compact ? (
      <div className="h-10 w-10" aria-hidden="true" />
    ) : (
      <div className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-secondary-foreground">
        <span className="flex items-center gap-3">
          <FiMoon size={21} className="shrink-0" />
          <span>Dark Mode</span>
        </span>

        <span className="text-xs text-muted-foreground">Theme</span>
      </div>
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="flex h-10 w-10 items-center justify-center rounded-full text-secondary-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
      >
        {isDark ? (
          <FiSun
            size={21}
            className="transition-transform duration-200 hover:rotate-12"
          />
        ) : (
          <FiMoon
            size={21}
            className="transition-transform duration-200 hover:rotate-12"
          />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-secondary-foreground transition-all hover:bg-muted hover:text-foreground"
    >
      <span className="flex items-center gap-3">
        {isDark ? (
          <FiSun
            size={21}
            className="shrink-0 transition-transform duration-200 group-hover:rotate-12"
          />
        ) : (
          <FiMoon
            size={21}
            className="shrink-0 transition-transform duration-200 group-hover:rotate-12"
          />
        )}

        <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
      </span>

      <span className="text-xs text-muted-foreground">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
};

export default ThemeToggle;