import { useEffect, useState } from "react";
import CardsAPI from "../../services/CardsAPI";
import { Box, Grid } from "@mui/material";
import CardModel from "../../models/CardModel";
import Card from "../../components/cards/Card";

export default function CardsPage() {
  const [cards, setCards] = useState();

  useEffect(() => {
    CardsAPI.getAll().then(cards => setCards(cards.map(data => new CardModel(data))));
  }, []);

  return (
    <Grid container spacing={2} paddingY={2}>
      {cards?.map(card => (
        <Grid key={card._id} item xs={12} md={3}>
          <Card {...card} />
        </Grid>
      ))}
    </Grid>
  );
}