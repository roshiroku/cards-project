import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light"
    }
  });
  const ctx = { isDarkMode, setIsDarkMode, theme };

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
  if (!ctx) throw new Error("useTheme must be used within a CustomThemeProvider");
  return ctx;
}