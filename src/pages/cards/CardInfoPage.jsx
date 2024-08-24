import React, { useEffect, useState } from "react"
import { Grid, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import CardsAPI from "../../services/CardsAPI";
import { useParams } from "react-router-dom";
import CardModel from "../../models/CardModel";

export default function CardInfoPage() {
  const [card, setCard] = useState(null);
  const { id } = useParams();

  // Chat GPT helped with formating the useFetchCard correctly. I tried using our CardsAPI but for some reason I was getting error 401. I think I don"t understand how it works. 

  useEffect(() => {
    //set loading
    CardModel.load(id).then(setCard);
  }, [id]);

  if (!card) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 3, borderRadius: 2, }}>
            <Typography variant="h4" gutterBottom>
              Business Info
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to the Business Card ID: {card.bizNumber}
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
      </Grid>
    </Container>
  )
}
