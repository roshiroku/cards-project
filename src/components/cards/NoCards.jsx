import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import LinkButton from "../content/LinkButton";
import { ROUTES } from "../../Router";
import { useContext } from "react";
import { SearchContext } from "../../providers/SearchProvider";

export default function NoCards({
  message = "No business cards available.",
  createCardButton = false,
  buttonText, buttonLink
}) {
  const { searchText } = useContext(SearchContext);

  const displayText = searchText ? "No business cards match your search." : message;
  const finalButtonText = buttonText || (createCardButton ? "Create a Business Card" : "Discover Businesses");
  const finalButtonLink = buttonLink || (createCardButton ? ROUTES.createCard : ROUTES.cards);

  return (
    <Box sx={{ textAlign: "center", mt: 8 }}>
      <SearchOffIcon sx={{ fontSize: 60, color: "text.secondary" }} />
      <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
        {displayText}
      </Typography>
      <LinkButton variant="contained" color="primary" to={finalButtonLink} sx={{ mt: 4 }} size="large">
        {finalButtonText}
      </LinkButton>
    </Box>
  );
}