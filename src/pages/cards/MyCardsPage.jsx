import React, { useCallback, useState } from "react"
import { Box, Typography } from "@mui/material";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import CardGrid from "../../components/cards/CardGrid";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import PaginationProvider from "../../providers/PaginationProvider";
import PageContent from "../../components/layout/PageContent";
import { useLoadEffect, usePageUI } from "../../providers/PageUIProvider";

export default function MyCardsPage() {
  const [cards, setCards] = useState([]);
  const { user } = useAuthentication();
  const { setNotification } = usePageUI();

  const loadCards = useCallback(async () => {
    const cards = await user.myCards();
    setCards(cards.sort((a, b) => a.createdAt - b.createdAt));
  }, [user]);

  useLoadEffect(async () => {
    if (user) {
      const isCached = !!user.cards;
      await loadCards();
      !isCached && setNotification({ message: "Cards loaded", severity: "success" });
    }
  }, [loadCards]);

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
