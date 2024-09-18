import { Box, Container, Typography } from "@mui/material";
import LinkButton from "../content/LinkButton";
import { ROUTES } from "../../Router";

export default function CallToActionSection() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Ready to Elevate Your Business?
      </Typography>
      <Typography variant="body1" paragraph>
        Join LeCard today and take your digital presence to the next level. Whether you're a business looking to showcase your brand or a user eager to discover new companies, we've got you covered.
      </Typography>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        mt: 4
      }}>
        <LinkButton to={ROUTES.register} variant="contained" color="primary" size="large">
          Join as a Business
        </LinkButton>
        <LinkButton to={ROUTES.cards} variant="outlined" color="inherit" size="large">
          Discover Businesses
        </LinkButton>
      </Box>
    </Container>
  );
}