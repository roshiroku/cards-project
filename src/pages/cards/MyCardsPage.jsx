import React, { useCallback, useEffect, useState } from 'react'
import Card from '../../components/cards/Card';
import { Box, Container, Grid, Typography } from '@mui/material';
import CardsAPI from '../../services/CardsAPI';
import CardModel from '../../models/CardModel';
import { useAuthentication } from '../../providers/AuthenticationProvider';

export default function MyCardsPage() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthentication();

  const loadCards = useCallback(async () => {
    if (user) {
      const cards = await user.myCards();
      setCards([...cards]);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
    loadCards();
  }, [user]);

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
            <Card id={card._id} ownerId={card.user_id} {...card} onChange={loadCards} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
