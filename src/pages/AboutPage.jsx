import { Container, Box, Typography, Grid, Card, CardContent } from "@mui/material";
import TechnologyIcon from "@mui/icons-material/Computer";
import { CheckCircle, Security, SupportAgent } from "@mui/icons-material";
import CallToActionSection from "../components/sections/CallToActionSection";

const featureData = [
  {
    icon: <CheckCircle color="primary" sx={{ fontSize: 40 }} />,
    title: "Easy Registration & Management",
    description: "Seamlessly sign up and manage multiple business cards with our intuitive platform.",
  },
  {
    icon: <Security color="primary" sx={{ fontSize: 40 }} />,
    title: "Secure & Reliable",
    description: "Protecting your data with JWT-based authentication and robust security measures.",
  },
  {
    icon: <TechnologyIcon color="primary" sx={{ fontSize: 40 }} />,
    title: "Cutting-Edge Technology",
    description: "Built with React, Material UI, and other modern libraries for a smooth experience.",
  },
  {
    icon: <SupportAgent color="primary" sx={{ fontSize: 40 }} />,
    title: "24/7 Support",
    description: "Our dedicated support team is here to help you whenever you need assistance.",
  },
];

export default function AboutPage() {
  return (
    <Container>
      {/* Introduction Section */}
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Welcome to <strong>LeCard</strong>, your premier platform for digital business networking.
        </Typography>
      </Box>

      {/* Mission Section */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" color="textSecondary">
          At <strong>LeCard</strong>, we believe that every business deserves a standout presence in the digital landscape. Our mission is to empower businesses of all sizes to create, manage, and display their digital business cards effortlessly, ensuring they make a lasting impression on potential clients and partners. Simultaneously, we strive to offer users a streamlined way to explore, bookmark, and interact with the businesses that matter most to them.
        </Typography>
      </Box>

      {/* Key Features Section */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {featureData.map((feature, i) => (
            <Grid key={i} item xs={12} md={6}>
              <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                <Box sx={{ mr: 2 }}>{feature.icon}</Box>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Security Section */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Security You Can Trust
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Your security is our top priority. We've implemented robust measures to ensure a safe and reliable experience for all users:
        </Typography>
        <Typography variant="body1" color="textSecondary" component="div">
          <ul>
            <li>
              <strong>JWT-Based Authentication:</strong> Our secure login system uses JSON Web Tokens (JWT) to protect your data and maintain your session seamlessly with auto-login capabilities.
            </li>
            <li>
              <strong>Account Protection:</strong> To safeguard your account, users who fail to log in successfully three times within a short period will be temporarily locked out for 24 hours, preventing unauthorized access attempts.
            </li>
          </ul>
        </Typography>
      </Box>

      {/* Technologies Section */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Built with Cutting-Edge Technology
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          We leverage the latest technologies to deliver a robust and user-friendly platform:
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Frontend:
            </Typography>
            <Typography variant="body1" color="textSecondary" component="div">
              <ul>
                <li>
                  <strong>React & Material UI:</strong> Creating a responsive and visually appealing interface that enhances user engagement.
                </li>
                <li>
                  <strong>React Router DOM:</strong> Enabling seamless navigation across different sections of the website.
                </li>
                <li>
                  <strong>JWT-Decode & Axios:</strong> Ensuring secure authentication processes and efficient data handling for a smooth user experience.
                </li>
              </ul>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Backend:
            </Typography>
            <Typography variant="body1" color="textSecondary" component="div">
              <ul>
                <li>
                  <strong>API Invocation Cache:</strong> Enhancing performance for swift and smooth navigation.<br />
                </li>
                <li>
                  <strong>Secure Data Management:</strong> Implementing robust security protocols to protect user and business data.
                </li>
              </ul>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* CRM for Administrators Section */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Comprehensive CRM for Administrators
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Our CRM (Customer Relationship Management) page is exclusively accessible to administrators, providing powerful tools to manage the platform effectively:
        </Typography>
        <Typography variant="body1" color="textSecondary" component="div">
          <ul>
            <li>
              <strong>User Management:</strong> View, filter, sort, edit, and remove users with ease, ensuring a well-maintained and secure community.
            </li>
            <li>
              <strong>Data Insights:</strong> Gain valuable insights into user interactions and platform usage to continuously improve our services.
            </li>
          </ul>
        </Typography>
      </Box>

      <CallToActionSection />
    </Container>
  );
}
