import { Box, Typography } from "@mui/material";

export default function EllipsisText({ children }) {
  return (
    <Box
      component="span"
      display="block"
      whiteSpace="nowrap"
      maxWidth="100%"
      overflow="hidden"
      textOverflow="ellipsis"
    >
      {children}
    </Box>
  );
}