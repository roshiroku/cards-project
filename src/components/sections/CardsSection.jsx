import { Box, Container, Typography } from "@mui/material";
import CardGrid from "../cards/CardGrid";
import PageContent from "../layout/PageContent";
import PaginationProvider from "../../providers/PaginationProvider";
import LinkButton from "../content/LinkButton";
import { ROUTES } from "../../Router";

export default function CardsSection({ cards, onChange }) {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" component="h2" align="center" sx={{ mb: 3 }}>
        Explore Our Business Cards
      </Typography>
      <Typography variant="body1" align="center" paragraph sx={{ mb: 4 }}>
        Dive into our extensive collection of digital business cards from a wide range of industries. Whether you"re looking for innovative startups or established enterprises, our gallery has something for everyone.
      </Typography>
      <PageContent>
        <PaginationProvider itemCount={cards.length} perPage={4}>
          <CardGrid {...{ cards, onChange }} />
        </PaginationProvider>
      </PageContent>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <LinkButton to={ROUTES.cards} variant="contained" color="primary" size="large">
          Browse All Cards
        </LinkButton>
      </Box>
    </Container>
  );
}