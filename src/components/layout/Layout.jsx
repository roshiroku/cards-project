import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import { useTheme } from "../../providers/ThemeProvider";
import SearchProvider from "../../providers/SearchProvider";
import { useCallback, useEffect, useState } from "react";
import { usePageUI } from "../../providers/PageUIProvider";
import "../../style/layout.scss";

export default function Layout({ children }) {
  const [showPopup, setShowPopup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const { theme } = useTheme();
  const { popup, notification } = usePageUI();

  const closePopup = useCallback((confirm = false) => {
    popup?.resolve && popup.resolve(confirm);
    setShowPopup(false);
  }, [popup]);

  const closeNotification = useCallback(() => setShowNotification(false), []);

  useEffect(() => {
    setShowPopup(!!popup);
  }, [popup]);

  useEffect(() => {
    setShowNotification(!!notification);
  }, [notification]);

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
      <Dialog open={showPopup} onClose={() => closePopup(false)}>
        {popup?.title && <DialogTitle children={popup.title} />}
        {popup?.text && (
          <DialogContent>
            <DialogContentText children={popup.text} />
          </DialogContent>
        )}
        {popup?.actions && (
          <DialogActions>
            {popup.actions == true ? (
              <>
                <Button onClick={() => closePopup(false)}>Cancel</Button>
                <Button onClick={() => closePopup(true)}>
                  Confirm
                </Button>
              </>
            ) : (
              popup.actions
            )}
          </DialogActions>
        )}
      </Dialog>
    </SearchProvider>
  );
}