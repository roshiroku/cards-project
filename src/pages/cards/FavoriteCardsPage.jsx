import React, { useCallback, useEffect, useState } from "react"
import CardModel from "../../models/CardModel";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { Box, Typography } from "@mui/material";
import PaginationProvider from "../../providers/PaginationProvider";
import CardGrid from "../../components/cards/CardGrid";
import { useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import { useSearch } from "../../providers/SearchProvider";

export default function FavoriteCardsPage() {
  const [cards, setCards] = useState([]);
  const { user } = useAuthentication();
  const { setNotification } = usePageUI();
  const { searchText } = useSearch();

  const loadCards = useCallback(async () => {
    const cards = await CardModel.loadAll();
    const favCards = cards.filter(card => card.isLikedBy(user) && (!searchText || card.matches(searchText)));
    setCards(favCards.sort((a, b) => a.createdAt - b.createdAt));
  }, [searchText, user]);

  useLoadEffect(async () => {
    if (user) {
      const isCached = !!CardModel.cache.all;
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
