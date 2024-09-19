import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function LinkButton({ children, ...props }) {
  return (
    <Button LinkComponent={Link} {...props}>
      {children}
    </Button>
  );
}
