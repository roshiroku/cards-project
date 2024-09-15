import { Business, ConnectWithoutContact, Create, Favorite, ManageAccounts, Search } from "@mui/icons-material";
import { Avatar, Box, Container, Grid, Paper, Typography } from "@mui/material";
import { memo } from "react";

const businessSteps = [
  {
    icon: <Business fontSize="large" color="inheirt" />,
    title: "Register Your Business",
    description: "Sign up quickly and securely using our JWT-based authentication.",
  },
  {
    icon: <Create fontSize="large" color="inheirt" />,
    title: "Create Your Card",
    description: "Design and customize your digital business card with ease.",
  },
  {
    icon: <ManageAccounts fontSize="large" color="inheirt" />,
    title: "Manage & Grow",
    description: "Edit, update, and track your business cards to stay ahead.",
  },
];

const userSteps = [
  {
    icon: <Search fontSize="large" color="inherit" />,
    title: "Browse & Discover",
    description: "Explore a diverse gallery of business cards across various industries.",
  },
  {
    icon: <Favorite fontSize="large" color="inherit" />,
    title: "Bookmark Favorites",
    description: "Save your preferred businesses with a simple click.",
  },
  {
    icon: <ConnectWithoutContact fontSize="large" color="inherit" />,
    title: "Connect Instantly",
    description: "Reach out to businesses directly through their digital cards.",
  },
];

const steps = [
  {
    title: "For Businesses",
    color: "primary",
    steps: businessSteps,
  },
  {
    title: "For Users",
    color: "secondary",
    steps: userSteps,
  }
];

export default memo(function HowItWorksSection() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" component="h2" align="center" sx={{ mb: 4 }}>
        How It Works
      </Typography>
      <Grid container spacing={4}>
        {steps.map(({ title, color, steps }, i) => (
          <Grid key={i} item xs={12} md={6} display="flex" flexDirection="column">
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              {title}
            </Typography>
            <Grid container spacing={2} flexGrow={1} display="grid" gridTemplateRows={`repeat(${steps.length}, 1fr)`}>
              {steps.map((step, j) => (
                <Grid item xs={12} key={j}>
                  <Paper
                    elevation={3}
                    sx={{ display: "flex", height: "100%", alignItems: "center", px: 2, py: 3 }}
                  >
                    <Avatar sx={{ color: `${color}.dark`, bgcolor: `${color}.light`, mr: 2, width: 56, height: 56, }}>
                      {step.icon}
                    </Avatar>
                    <Box sx={{ pb: 0.5 }}>
                      <Typography variant="h6" component="div">
                        {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
});