import React, { useCallback, useEffect, useState } from "react"
import { Box, Typography } from "@mui/material";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import CardGrid from "../../components/cards/CardGrid";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import PaginationProvider from "../../providers/PaginationProvider";
import PageContent from "../../components/layout/PageContent";
import { useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import { useSearch } from "../../providers/SearchProvider";

export default function MyCardsPage() {
  const [cards, setCards] = useState([]);
  const { user } = useAuthentication();
  const { setNotification } = usePageUI();
  const { searchText } = useSearch();

  const loadCards = useCallback(async () => {
    const myCards = await user.myCards();
    const cards = searchText ? myCards.filter(card => card.matches(searchText)) : myCards;
    setCards(cards.sort((a, b) => a.createdAt - b.createdAt));
  }, [searchText, user]);

  useLoadEffect(async () => {
    if (user) {
      const isCached = !!user.cards;
      await loadCards();
      !isCached && setNotification({ message: "Cards loaded", severity: "success" });
    }
  }, [user]);

  useEffect(() => {
    user && loadCards();
  }, [searchText]);

  return (
    <PageContent>
      {
        user?.isBusiness ?
          <PaginationProvider itemCount={cards.length}>
            <Box sx={{ padding: 3, borderRadius: 2 }}>
              <Typography variant="h4" gutterBottom>
                Your Cards
              </Typography>
              <Typography variant="body1" paragraph>
                Welcome to your Cards page! Where you may view all the cards you created!
              </Typography>
            </Box>
            <CardGrid cards={cards} onChange={loadCards} />
          </PaginationProvider> :
          <Navigate to={ROUTES.root} replace />
      }
    </PageContent>
  );
}
