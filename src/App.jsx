import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Router from "./Router";
import AuthenticationProvider from "./providers/AuthenticationProvider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <Layout>
          <Router />
        </Layout>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}