import { Alert, Box, Snackbar } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import { useTheme } from "../../providers/ThemeProvider";
import SearchProvider from "../../providers/SearchProvider";
import { useCallback, useEffect, useState } from "react";
import { usePageUI } from "../../providers/PageUIProvider";
import { useLocation } from "react-router-dom";
import "../../style/layout.scss";

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();
  const { theme } = useTheme();
  const { notification } = usePageUI();
  const [showNotification, setShowNotification] = useState(false);
  const closeNotification = useCallback(() => setShowNotification(false), []);

  useEffect(() => {
    setShowNotification(Boolean(notification));
  }, [notification]);

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);

  return (
    <SearchProvider>
      <Box
        display="flex"
        flexDirection="column"
        flexGrow="1"
        color={theme.palette.text.primary}
        bgcolor={theme.palette.background.default}
      >
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
      <Snackbar
        key={notification?.message}
        open={showNotification}
        autoHideDuration={3000}
        onClose={closeNotification}
      // action={action}
      >
        <Alert
          onClose={closeNotification}
          severity={notification?.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </SearchProvider>
  );
}