import React, { useEffect, useState } from "react"
import CardModel from "../../models/CardModel";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { Box, Grid, Typography } from "@mui/material";
import Card from "../../components/cards/Card";

export default function FavoriteCardsPage() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthentication();

  const placeholder = () => console.log("Boop");
  // I've lost track of what's the onChange we need to pass.

  // Be mindful of all the console logs.

  useEffect(() => {
    if (user) {
      const fetchCards = async () => {
        setIsLoading(true);
        const cards = await CardModel.loadAll();
        // console.log(cards);
        // console.log(user._id);

        const filteredCards = cards.filter(card =>
          card.likes && card.likes.includes(user._id));
        setCards(filteredCards);
        // console.log(filteredCards);
        setIsLoading(false);
      };
      fetchCards();
    }
  }, [user]);

  return (
    !isLoading &&
    <>
      <Box sx={{ padding: 3, borderRadius: 2, }}>
        <Typography variant="h4" gutterBottom>
          Your Favorite Cards
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to your Fav cards page! Where you may view all the cards you liked!
        </Typography>
      </Box>
      <Grid container spacing={2} marginBottom={5}>
        {cards.map(card => (
          <Grid key={card._id} item xs={12} md={3}>
            <Card id={card._id} ownerId={card.user_id} {...card} onChange={placeholder} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
