import { createContext, useContext, useLayoutEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark" | "system";
type Ctx = {
  theme: Theme;
  effective: "light" | "dark";
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

function computeEffective(next: Theme): "light" | "dark" {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (next === "system") return prefersDark ? "dark" : "light";
  return next;
}

function applyTheme(next: Theme) {
  const eff = computeEffective(next);
  const root = document.documentElement;
  if (eff === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  root.style.colorScheme = eff === "dark" ? "dark" : "light";
  localStorage.setItem("theme", next);
  return eff;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "light");
  const [effective, setEffective] = useState<"light" | "dark">("light");

  useLayoutEffect(() => {
    setEffective(applyTheme(theme));
  }, [theme]);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const saved = (localStorage.getItem("theme") as Theme) || "light";
      if (saved === "system") setEffective(applyTheme("system"));
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const api = useMemo<Ctx>(() => ({
    theme,
    effective,
    setTheme: (t) => setThemeState(t),
    toggle: () => setThemeState(prev => (computeEffective(prev) === "dark" ? "light" : "dark")),
  }), [theme, effective]);

  return <ThemeCtx.Provider value={api}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
