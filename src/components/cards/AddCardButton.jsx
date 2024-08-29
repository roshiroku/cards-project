import { Button, Fab } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../Router"
import { Add } from "@mui/icons-material"
import { useAuthentication } from "../../providers/AuthenticationProvider"

export default function AddNewCardButton() {
  const { user } = useAuthentication();

  return (
    user?.isBusiness &&
    <Fab
      color="primary"
      sx={{ position: "fixed", bottom: "32px", left: "calc(100vw - 56px - 32px)" }}
      LinkComponent={Link}
      to={ROUTES.createCard}
    >
      <Add />
    </Fab>
  );
};