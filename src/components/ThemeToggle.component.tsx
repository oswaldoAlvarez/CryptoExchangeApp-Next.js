"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ICON_SIZE = 20;

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      className="flex items-center gap-2 focus:outline-none"
    >
      {isDark ? (
        <Moon size={ICON_SIZE} className="text-gray-100" />
      ) : (
        <Sun size={ICON_SIZE} className="text-gray-900" />
      )}
    </button>
  );
};
