import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "dark" | "light" | "system";
export type ColorTheme =
  | "medical"
  | "teal"
  | "green"
  | "violet"
  | "indigo"
  | "cyan"
  | "sky"
  | "amber"
  | "orange"
  | "rose"
  | "pink"
  | "neutral";

const THEME_STORAGE_KEY = "hospital-ui-theme";
const COLOR_STORAGE_KEY = "hospital-ui-color";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColor?: ColorTheme;
};

type ThemeProviderState = {
  theme: Theme;
  color: ColorTheme;
  setTheme: (theme: Theme) => void;
  setColor: (color: ColorTheme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  color: "medical",
  setTheme: () => null,
  setColor: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function getSystemTheme(): "dark" | "light" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyThemeToRoot(theme: Theme) {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  if (theme === "system") {
    root.classList.add(getSystemTheme());
    return;
  }

  root.classList.add(theme);
}

function applyColorToRoot(color: ColorTheme) {
  const root = window.document.documentElement;

  if (color === "medical") {
    root.removeAttribute("data-theme");
    return;
  }

  root.setAttribute("data-theme", color);
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultColor = "medical",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    return stored ?? defaultTheme;
  });

  const [color, setColorState] = useState<ColorTheme>(() => {
    const stored = localStorage.getItem(COLOR_STORAGE_KEY) as ColorTheme | null;
    return stored ?? defaultColor;
  });

  useEffect(() => {
    applyThemeToRoot(theme);
    applyColorToRoot(color);
  }, [theme, color]);

  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyThemeToRoot("system");

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = useCallback((nextTheme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setThemeState(nextTheme);
  }, []);

  const setColor = useCallback((nextColor: ColorTheme) => {
    localStorage.setItem(COLOR_STORAGE_KEY, nextColor);
    setColorState(nextColor);
  }, []);

  return (
    <ThemeProviderContext.Provider value={{ theme, color, setTheme, setColor }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
