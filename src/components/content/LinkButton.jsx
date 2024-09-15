import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function LinkButton({ children, ...props }) {
  return (
    <Button LinkComponent={Link} {...props}>
      {children}
    </Button>
  );
}

export function LinkIconButton({ children, ...props }) {
  return (
    <IconButton LinkComponent={Link} {...props}>
      {children}
    </IconButton>
  );
}