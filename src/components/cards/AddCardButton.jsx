import { Fab } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../Router"
import { Add } from "@mui/icons-material"

export default function AddCardButton() {
  return (
    <Fab
      color="primary"
      LinkComponent={Link}
      to={ROUTES.createCard}
      sx={({ spacing }) => ({
        position: "fixed",
        bottom: spacing(3),
        left: `calc(100vw - ${spacing(12)})`,
      })}
    >
      <Add />
    </Fab>
  );
}