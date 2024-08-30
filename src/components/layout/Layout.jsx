import { Box, Container } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import "../../style/layout.scss";
import { useTheme } from "../../providers/ThemeProvider";
import SearchProvider from "../../providers/SearchProvider";

export default function Layout({ children }) {
  const { theme } = useTheme();

  return (
    <SearchProvider>
      <Box bgcolor={theme.palette.background.default} color={theme.palette.text.primary} height="100%">
        <Header />
        <Container component="main">
          {children}
        </Container>
        <Footer />
      </Box>
    </SearchProvider>
  );
}