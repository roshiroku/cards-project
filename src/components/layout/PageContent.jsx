import { Box, CircularProgress, Typography } from "@mui/material";
import { usePageUI } from "../../providers/PageUIProvider";
import { useEffect, useState } from "react";

export default function PageContent({ children }) {
  const [initialLoading, setInitialLoading] = useState(true);
  const { isLoading, setLoadingCount, error, setError } = usePageUI();

  useEffect(() => {
    setInitialLoading(false);
    return () => {
      setLoadingCount(0);
      setError("");
    };
  }, []);

  return (
    initialLoading || isLoading ?
      <Box display="flex" flexDirection="column" flexGrow="1" justifyContent="center" alignItems="center">
        <CircularProgress size={72} />
      </Box> :
      error ?
        <Typography>{error}</Typography> :
        children
  );
}