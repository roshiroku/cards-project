import React, { useEffect, useState } from "react"
import { Grid, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useParams } from "react-router-dom";
import CardModel from "../../models/CardModel";
import { useLoadEffect } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";

export default function CardInfoPage() {
  const [card, setCard] = useState(null);
  const { id } = useParams();

  useLoadEffect(async () => {
    const card = await CardModel.load(id);
    setCard(card);
  }, [id]);

  return (
    <PageContent>
      <Container maxWidth="md" sx={{ my: 3 }}>
        <Grid container spacing={4} alignItems="stretch">
          <CardBody card={card} />
          <CardImage card={card} />
        </Grid>
      </Container>
    </PageContent>
  );
}

export function CardBody({ card }) {
  return (
    <Grid item xs={12} md={6}>
      <Box sx={{ padding: 3, borderRadius: 2, }}>
        <Typography variant="h4" gutterBottom>
          Business Info
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to the Business Card Number: {card.bizNumber}
        </Typography>
        <Typography variant="body1" paragraph>
          <b>Title:</b> {card.title}
        </Typography>
        <Typography variant="body1" paragraph>
          <b>Subtitle:</b> {card.subtitle}
        </Typography>
        <Typography variant="body1" paragraph>
          <b>Description:</b> {card.description}
        </Typography>
        <Typography variant="body1" paragraph>
          <b>Business Phone:</b> {card.phone}
        </Typography>
        <Typography variant="body1" paragraph>
          <b>Business Address:</b> {card.fullAddress}
        </Typography>
        <Typography variant="body1">
          Thank you for visiting. Please let us know if there"s anything we can help you with or impove at!
        </Typography>
      </Box>
    </Grid>
  );
}

export function CardImage({ card }) {
  return (
    <Grid item xs={12} md={6}>
      <Paper
        sx={{
          padding: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "95%",
          boxShadow: "none",
        }}
        elevation={3}
      >
        <img
          src={card.image.url}
          alt="Image Placeholder"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: 8
          }}
        />
      </Paper>
    </Grid>
  );
}