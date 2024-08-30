import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Router from "./Router";
import AuthenticationProvider from "./providers/AuthenticationProvider";
import ThemeProvider from "./providers/ThemeProvider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <ThemeProvider>
          <Layout>
            <Router />
          </Layout>
        </ThemeProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}