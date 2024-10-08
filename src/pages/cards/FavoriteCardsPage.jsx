import { useCallback, useEffect, useState } from "react"
import CardModel from "../../models/CardModel";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { Box, Container, Typography } from "@mui/material";
import PaginationProvider from "../../providers/PaginationProvider";
import CardGrid from "../../components/cards/CardGrid";
import { useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import ContentLoader from "../../components/layout/ContentLoader";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import { useSearch } from "../../providers/SearchProvider";
import CallToActionSection from "../../components/sections/CallToActionSection";
import NoCards from "../../components/cards/NoCards";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function FavoriteCardsPage() {
  const [cards, setCards] = useState([]);

  const { user } = useAuthentication();
  const { setNotificationMessage } = usePageUI();
  const { searchText } = useSearch();

  const loadCards = useCallback(async () => {
    const cards = await CardModel.loadAll();
    const favCards = cards.filter(card => card.isLikedBy(user) && (!searchText || card.matches(searchText)));
    setCards(favCards.sort((a, b) => a.createdAt - b.createdAt));
  }, [searchText, user]);

  useDocumentTitle("LeCard - Favorite Business Cards");

  useLoadEffect(async () => {
    if (user) {
      const isCached = !!CardModel.cache.all;
      await loadCards();
      !isCached && setNotificationMessage("Business cards loaded successfully.");
    }
  }, [user]);

  useEffect(() => {
    user && loadCards();
  }, [searchText]);

  return (
    <>
      <Container sx={{ py: 6 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Your Favorite Business Cards
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Browse and manage your bookmarked business cards. Discover and connect with the businesses you love.
          </Typography>
        </Box>
        <ContentLoader>
          {user ? (
            cards.length ? (
              <PaginationProvider itemCount={cards.length} perPage={8}>
                <CardGrid cards={cards} onChange={loadCards} />
              </PaginationProvider>
            ) : (
              <NoCards message="You have no favorite business cards yet." browseCardsButton />
            )) : (
            <Navigate to={ROUTES.root} replace />
          )}
        </ContentLoader>
      </Container>
      <CallToActionSection />
    </>
  );
}
