import { useCallback, useEffect, useState } from "react";
import CardModel from "../../models/CardModel";
import AddCardButton from "../../components/cards/AddCardButton";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import PaginationProvider from "../../providers/PaginationProvider";
import CardGrid from "../../components/cards/CardGrid";
import { useSearch } from "../../providers/SearchProvider";
import { useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import ContentLoader from "../../components/layout/ContentLoader";
import CallToActionSection from "../../components/sections/CallToActionSection";
import { Box, Container, Typography } from "@mui/material";
import NoCards from "../../components/cards/NoCards";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function CardsPage() {
  const [cards, setCards] = useState([]);

  const { user } = useAuthentication();
  const { setNotificationMessage } = usePageUI();
  const { searchText } = useSearch();

  const loadCards = useCallback(async () => {
    const allCards = await CardModel.loadAll();
    const cards = searchText ? allCards.filter(card => card.matches(searchText)) : allCards;
    setCards(cards.sort((a, b) => a.createdAt - b.createdAt));
  }, [searchText]);

  useDocumentTitle("LeCard - Business Cards");

  useLoadEffect(async () => {
    const isCached = !!CardModel.cache.all;
    await loadCards();
    !isCached && setNotificationMessage("Business cards loaded successfully.");
  }, []);

  useEffect(() => {
    CardModel.cache.all && loadCards();
  }, [searchText]);

  return (
    <>
      <Container sx={{ py: 6 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Explore Our Business Cards
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Discover a diverse collection of digital business cards from various industries. Use the search feature to find exactly what you're looking for and bookmark your favorites for easy access.
          </Typography>
        </Box>
        <ContentLoader>
          {cards.length ? (
            <PaginationProvider itemCount={cards.length} perPage={8}>
              <CardGrid cards={cards} onChange={loadCards} />
            </PaginationProvider>
          ) : (
            <NoCards createCardButton={user?.isBusiness} />
          )}
        </ContentLoader>
        {user?.isBusiness && <AddCardButton />}
      </Container>
      <CallToActionSection />
    </>
  );
}
