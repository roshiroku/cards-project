import { useCallback, useEffect, useState } from "react"
import { Box, Container, Typography } from "@mui/material";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import CardGrid from "../../components/cards/CardGrid";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import PaginationProvider from "../../providers/PaginationProvider";
import ContentLoader from "../../components/layout/ContentLoader";
import { useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import { useSearch } from "../../providers/SearchProvider";
import CallToActionSection from "../../components/sections/CallToActionSection";
import NoCards from "../../components/cards/NoCards";
import AddCardButton from "../../components/cards/AddCardButton";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function MyCardsPage() {
  const [cards, setCards] = useState([]);

  const { user } = useAuthentication();
  const { setNotificationMessage } = usePageUI();
  const { searchText } = useSearch();

  const loadCards = useCallback(async () => {
    const myCards = await user.myCards();
    const cards = searchText ? myCards.filter(card => card.matches(searchText)) : myCards;
    setCards(cards.sort((a, b) => a.createdAt - b.createdAt));
  }, [searchText, user]);

  useDocumentTitle("LeCard - My Business Cards");

  useLoadEffect(async () => {
    if (user) {
      const isCached = !!user.cards;
      await loadCards();
      !isCached && setNotificationMessage("Your business cards have been loaded.");
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
            My Business Cards
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Manage your digital business cards with ease. Create, edit, and showcase your brand to attract more clients and partners.
          </Typography>
        </Box>
        <ContentLoader>
          {user?.isBusiness ? (
            cards.length ? (
              <PaginationProvider itemCount={cards.length} perPage={8}>
                <CardGrid cards={cards} onChange={loadCards} />
              </PaginationProvider>
            ) : (
              <NoCards message="You have not created any business cards yet." createCardButton />
            )) : (
            <Navigate to={ROUTES.root} replace />
          )}
        </ContentLoader>
        {user?.isBusiness && <AddCardButton />}
      </Container>
      <CallToActionSection />
    </>
  );
}
