import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Router from "./Router";
import AuthenticationProvider from "./providers/AuthenticationProvider";
import ThemeProvider from "./providers/ThemeProvider";
import PageUIProvider from "./providers/PageUIProvider";
import ScrollToTop from "./components/layout/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <PageUIProvider>
        <AuthenticationProvider>
          <ThemeProvider>
            <Layout>
              <ScrollToTop />
              <Router />
            </Layout>
          </ThemeProvider>
        </AuthenticationProvider>
      </PageUIProvider>
    </BrowserRouter>
  );
}