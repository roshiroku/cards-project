import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import errorImageUrl from "../assets/errorImage.png";
import { useTheme } from '../providers/ThemeProvider';

export default function ErrorPage() {
  const { theme } = useTheme();
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
              backgroundImage: 'none'
            }}
            elevation={3}
          >
            <img
              src={errorImageUrl} // Replace with your actual image URL
              alt="Error Illustration"
              style={{
                width: '100%', // Make the image take full width
                height: 'auto', // Make the image take full height
                objectFit: 'cover',
                borderRadius: 8,
                filter: theme.palette.mode == "dark" ? "invert(1)" : ""
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
