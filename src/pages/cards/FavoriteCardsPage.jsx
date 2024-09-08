import React, { useCallback, useEffect, useState } from "react"
import CardModel from "../../models/CardModel";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { Box, Typography } from "@mui/material";
import PaginationProvider from "../../providers/PaginationProvider";
import CardGrid from "../../components/cards/CardGrid";
import { useLoadCallback, useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Router";

export default function FavoriteCardsPage() {
  const [cards, setCards] = useState([]);
  const { user } = useAuthentication();
  const { setNotification } = usePageUI();

  const loadCards = useCallback(async () => {
    const cards = await CardModel.loadAll();
    const favCards = cards.filter(card => card.isLikedBy(user));
    setCards(favCards.sort((a, b) => a.createdAt - b.createdAt));
  }, [user]);

  useLoadEffect(async () => {
    if (user) {
      const isCached = !!CardModel.cache.all;
      await loadCards();
      !isCached && setNotification({ message: "Cards loaded", severity: "success" });
    }
  }, [loadCards]);

  return (
    <PageContent>
      {
        user ?
          <PaginationProvider itemCount={cards.length}>
            <Box sx={{ padding: 3, borderRadius: 2, }}>
              <Typography variant="h4" gutterBottom>
                Your Favorite Cards
              </Typography>
              <Typography variant="body1" paragraph>
                Welcome to your Fav cards page! Where you may view all the cards you liked!
              </Typography>
            </Box>
            <CardGrid cards={cards} onChange={loadCards} />
          </PaginationProvider> :
          <Navigate to={ROUTES.root} replace />
      }
    </PageContent>
  );
}
