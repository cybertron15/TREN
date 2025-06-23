"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return theme === "dark" ? (
    <Sun
      className="h-6 w-6 cursor-pointer text-muted-foreground mb-2 mx-4"
      onClick={() => setTheme("light")}
    />
  ) : (
    <Moon
      className="h-6 w-6 cursor-pointer text-muted-foreground mb-2 mx-4"
      onClick={() => setTheme("dark")}
    />
  );
}

export default ToggleTheme;
