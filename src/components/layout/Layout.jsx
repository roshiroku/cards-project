import { Container } from "@mui/material";
import ThemeProvider from "../../providers/ThemeProvider";
import Footer from "./Footer";
import Header from "./Header";
import "../../style/layout.scss";

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <Header />
      <Container component="main">
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}