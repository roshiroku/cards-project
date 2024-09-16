import { AppBar, Box, Container, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Send, X } from "@mui/icons-material";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Router";

export default function Footer() {
  return (
    <AppBar position="static" component="footer" sx={{ mt: 6 }}>
      <Container sx={{ pt: 6, pb: 4 }}>
        <Grid container spacing={4}>
          {/* Navigation Links */}
          <Grid item xs={12} md={4}>
            <Logo sx={{ mb: 2 }} />
            <Typography variant="button" component="div">
              <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
                <Link to={ROUTES.root} style={{ color: "inherit" }}>
                  Home
                </Link>
                <NavLinks />
              </Box>
            </Typography>
          </Grid>

          {/* Social Media Icons */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton color="inherit" href="https://facebook.com" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://x.com" target="_blank">
                <X />
              </IconButton>
              <IconButton color="inherit" href="https://linkedin.com" target="_blank">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com" target="_blank">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          {/* Contact Information & Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1">
              Email: support@lecard.fake
            </Typography>
            <Typography variant="body1">
              Phone: (123) 456-7890
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Subscribe to Our Newsletter
              </Typography>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  size="small"
                  placeholder="Enter your email"
                  sx={{ backgroundColor: "background.paper", borderRadius: 1, width: "100%" }}
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <IconButton type="submit" color="primary">
                          <Send />
                        </IconButton>
                      </InputAdornment>
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} LeCard. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </AppBar>
  );
}