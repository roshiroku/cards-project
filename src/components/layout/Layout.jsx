import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import SearchProvider from "../../providers/SearchProvider";
import { useCallback, useEffect, useState } from "react";
import { usePageUI } from "../../providers/PageUIProvider";

export default function Layout({ children }) {
  return (
    <SearchProvider>
      <Box
        sx={theme => ({
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
          color: theme.palette.text.primary,
          bgcolor: theme.palette.background.default
        })}
      >
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
        <Footer />
      </Box>
      <Notification />
      <Popup />
    </SearchProvider>
  );
}

function Notification() {
  const [open, setOpen] = useState(false);

  const { notification } = usePageUI();

  useEffect(() => {
    setOpen(!!notification);
  }, [notification]);

  return (
    <Snackbar
      key={notification?.message}
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={notification?.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  );
}

function Popup() {
  const [open, setOpen] = useState(false);

  const { popup } = usePageUI();

  const onClose = useCallback((confirm = false) => {
    popup?.resolve && popup.resolve(confirm);
    setOpen(false);
  }, [popup]);

  useEffect(() => {
    setOpen(!!popup);
  }, [popup]);

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      {popup?.title && <DialogTitle>{popup.title}</DialogTitle>}
      {popup?.text && (
        <DialogContent>
          <DialogContentText>{popup.text}</DialogContentText>
        </DialogContent>
      )}
      {popup?.actions && (
        <DialogActions>
          {popup.actions.map((action, i) => (
            <Box key={i}>
              {action == "cancel" ? (
                <Button onClick={() => onClose(false)}>Cancel</Button>
              ) : (
                action == "confirm" ? (
                  <Button onClick={() => onClose(true)} color="primary">
                    Confirm
                  </Button>
                ) : (
                  action
                )
              )}
            </Box>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
}
