import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import SearchProvider from "../../providers/SearchProvider";
import { useCallback, useEffect, useState } from "react";
import { usePageUI } from "../../providers/PageUIProvider";
import "../../style/layout.scss";

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

export function Notification() {
  const { notification } = usePageUI();
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setOpen(!!notification);
  }, [notification]);

  return (
    <Snackbar
      key={notification?.message}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={notification?.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  );
}

export function Popup() {
  const { popup } = usePageUI();
  const [open, setOpen] = useState(false);

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
          {popup.actions == true ? (
            <>
              <Button onClick={() => onClose(false)}>Cancel</Button>
              <Button onClick={() => onClose(true)} color="primary">
                Confirm
              </Button>
            </>
          ) : (
            popup.actions
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}