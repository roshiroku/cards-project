import { Box, Container, Typography } from "@mui/material";
import LinkButton from "../content/LinkButton";
import { ROUTES } from "../../Router";
import { useAuthentication } from "../../providers/AuthenticationProvider";

export default function HeroSection() {
  const { user } = useAuthentication();

  return (
    <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
      <Typography sx={{ typography: { xs: "h4", sm: "h3" } }} component="h1" gutterBottom>
        Connect, Showcase, and Discover - Your Digital Business Card Hub
      </Typography>
      <Typography variant="h6" gutterBottom>
        Create stunning digital business cards, manage your brand effortlessly, and explore a world of businesses at your fingertips.
      </Typography>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        mt: 4
      }}>
        <LinkButton
          to={user?.isBusiness ? ROUTES.createCard : ROUTES.register}
          variant="contained"
          color="primary"
          size="large"
        >
          Get Started
        </LinkButton>
        <LinkButton
          to={ROUTES.cards}
          variant="outlined"
          color="inherit"
          size="large"
        >
          Explore Now
        </LinkButton>
      </Box>
    </Container>
  );
}