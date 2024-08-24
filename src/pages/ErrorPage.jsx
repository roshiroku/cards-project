import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import errorImageURL from "../assets/errorImage.png";

export default function ErrorPage() {
  return (
    <Container maxWidth="md">
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: 3,
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h3" color="error" gutterBottom>
              <ErrorOutlineIcon fontSize="inherit" /> Oops!
            </Typography>
            <Typography variant="h5" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body1" paragraph>
              We encountered an unexpected error while processing your request. Please try again later or contact support if the issue persists.
            </Typography>
            <Typography variant="body1">
              Return to the <a href="/">homepage</a> or use the navigation menu to find your way back.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              margin: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '90%',
              boxShadow: 'none',
            }}
            elevation={3}
          >
            <img
              src={errorImageURL} // Replace with your actual image URL
              alt="Error Illustration"
              style={{
                width: '100%', // Make the image take full width
                height: 'auto', // Make the image take full height
                objectFit: 'cover',
                borderRadius: 8
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
