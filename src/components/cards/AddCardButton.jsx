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
    <Link to={ROUTES.createCard}>
      <Fab color="primary" sx={{ position: "fixed", bottom: "70px", right: "15px" }}>
        <Add />
      </Fab>
    </Link>
  );
};