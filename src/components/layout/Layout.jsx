import { Container } from "@mui/material";
import ThemeProvider from "../../providers/ThemeProvider";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <Header />
      <Container>
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}