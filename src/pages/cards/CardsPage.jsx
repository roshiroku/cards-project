import { useEffect, useState } from "react";
import Card from "../../components/cards/Card";
import CardsAPI from "../../services/CardsAPI";
import { Box, Grid } from "@mui/material";

export default function CardsPage() {
  const [cards, setCards] = useState();

  useEffect(() => {
    CardsAPI.all().then(setCards);
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