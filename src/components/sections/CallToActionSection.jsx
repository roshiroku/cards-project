import { Box, Container, Typography } from "@mui/material";
import LinkButton from "../content/LinkButton";
import { ROUTES } from "../../Router";

export default function CallToActionSection() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
        Ready to Elevate Your Business?
      </Typography>
      <Typography variant="body1" paragraph>
        Join LeCard today and take your digital presence to the next level. Whether you're a business looking to showcase your brand or a user eager to discover new companies, we've got you covered.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <LinkButton to={ROUTES.register} variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
          Join as a Business
        </LinkButton>
        <LinkButton to={ROUTES.cards} variant="outlined" color="inherit" size="large">
          Discover Businesses
        </LinkButton>
      </Box>
    </Container>
  );
}