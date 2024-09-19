import { Box, Button, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import LinkButton from "../content/LinkButton";
import { ROUTES } from "../../Router";
import { useContext } from "react";
import { SearchContext } from "../../providers/SearchProvider";

export default function NoCards({
  message = "No business cards available.",
  createCardButton = false,
  browseCardsButton = false
}) {
  const { searchText, setSearchText } = useContext(SearchContext);

  const displayText = searchText ? "No business cards match your search." : message;

  return (
    <Box sx={{ textAlign: "center", mt: 8 }}>
      <SearchOffIcon sx={{ fontSize: 60, color: "text.secondary" }} />
      <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
        {displayText}
      </Typography>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: "center",
        gap: 2,
        mt: 4
      }}>
        {createCardButton && (
          <LinkButton variant="contained" color="primary" to={ROUTES.createCard} size="large">
            Create a Business Card
          </LinkButton>
        )}
        {browseCardsButton && (
          <LinkButton
            variant="contained" color={createCardButton ? "secondary" : "primary"}
            to={ROUTES.cards}
            size="large"
          >
            Explore Business Cards
          </LinkButton>
        )}
        {searchText && (
          <Button
            variant={createCardButton || browseCardsButton ? "outlined" : "contained"}
            color="primary"
            size="large"
            onClick={() => setSearchText("")}
          >
            Clear Search
          </Button>
        )}
      </Box>
    </Box>
  );
}
