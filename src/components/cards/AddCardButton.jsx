import { Fab, styled } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../Router"
import { Add } from "@mui/icons-material"

const StyledFab = styled(Fab)(({ theme }) => `
  position: fixed;
  bottom: ${theme.spacing(4)};
  left: calc(100vw - 56px - ${theme.spacing(4)});`
);

export default function AddCardButton() {
  return (
    <StyledFab
      color="primary"
      LinkComponent={Link}
      to={ROUTES.createCard}
    >
      <Add />
    </StyledFab>
  );
};