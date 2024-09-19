import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

const DARKMODE_STORAGE_KEY = "darkmode";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(!!JSON.parse(localStorage.getItem(DARKMODE_STORAGE_KEY)));

  const setDarkMode = useCallback(value => {
    localStorage.setItem(DARKMODE_STORAGE_KEY, JSON.stringify(value));
    setIsDarkMode(value);
  }, []);

  const lightTheme = useMemo(() => createTheme({ palette: { mode: "light" } }), []);

  const darkTheme = useMemo(() => createTheme({ palette: { mode: "dark" } }), []);

  const theme = useMemo(() => isDarkMode ? darkTheme : lightTheme, [isDarkMode]);

  const ctx = useMemo(() => ({ isDarkMode, setIsDarkMode: setDarkMode, theme, darkTheme, lightTheme }), [isDarkMode, theme]);

  return (
    <MUIThemeProvider theme={theme}>
      <ThemeContext.Provider value={ctx}>
        {children}
      </ThemeContext.Provider>
    </MUIThemeProvider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}