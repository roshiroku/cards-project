import React, { useEffect, useState } from 'react'
import Card from '../../components/cards/Card';
import { Box, Container, Grid, Typography } from '@mui/material';
import CardsAPI from '../../services/CardsAPI';

export default function MyCardsPage() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const placeholder = () => console.log("Boop");
  // I've lost track of what's the onChange we need to pass.

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      const cardsData = await CardsAPI.myCards();
      setCards(cardsData);
      setIsLoading(false);
    };
    fetchCards();
  }, []);

  return (
    !isLoading &&
    <>
      <Box sx={{ padding: 3, borderRadius: 2, }}>
        <Typography variant="h4" gutterBottom>
          Your Cards
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to your Cards page! Where you may view all the cards you created!
        </Typography>
      </Box>
      <Grid container spacing={2} marginBottom={5}>
        {cards.map(card => (
          <Grid key={card._id} item xs={12} md={3}>
            <Card id={card._id} userId={card.user_id} {...card} onChange={placeholder} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
