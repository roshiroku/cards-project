import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";
import { usePageUI } from "../../providers/PageUIProvider";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function PageContent({ children }) {
  const [initialLoading, setInitialLoading] = useState(true);
  const { isLoading } = usePageUI();

  useEffect(() => {
    setInitialLoading(false);
  }, []);

  return (
    initialLoading || isLoading ?
      <Box display="flex" flexDirection="column" flexGrow="1" justifyContent="center" alignItems="center">
        <CircularProgress size={72} />
      </Box> :
      children
  );
}