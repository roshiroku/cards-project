import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Router from "./Router";
import { Box } from "@mui/material";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
}