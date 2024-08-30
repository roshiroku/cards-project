import React, { useCallback, useEffect, useState } from "react"
import CardModel from "../../models/CardModel";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { Box, Grid, Typography } from "@mui/material";
import Card from "../../components/cards/Card";
import PaginationProvider from "../../providers/PaginationProvider";
import CardGrid from "../../components/cards/CardGrid";
import { useSearch } from "../../providers/SearchProvider";

export default function FavoriteCardsPage() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchText, setShowSearch } = useSearch();
  const { user } = useAuthentication();

  const loadCards = useCallback(async () => {
    setIsLoading(true);
    const cards = await CardModel.loadAll();
    const favCards = cards.filter(card => {
      return card.isLikedBy(user) && card.matches(searchText);
    });
    setCards(favCards);
    setIsLoading(false);
  }, [user, searchText]);

  useEffect(() => {
    user && loadCards();
  }, [user, searchText]);

  useEffect(() => {
    setShowSearch(true);
  }, []);

  return (
    !isLoading &&
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
    </PaginationProvider>
  );
}
