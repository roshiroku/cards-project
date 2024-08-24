import { Route, Routes } from "react-router-dom";
import CardsPage from "./pages/cards/CardsPage";
import AboutPage from "./pages/AboutPage";
import MyCardsPage from "./pages/cards/MyCardsPage";
import FavoriteCardsPage from "./pages/cards/FavoriteCardsPage";
import CardInfoPage from "./pages/cards/CardInfoPage";
import AddCardPage from "./pages/cards/AddCardPage";
import EditCardPage from "./pages/cards/EditCardPage";
import LoginPage from "./pages/users/LoginPage";
import RegisterPage from "./pages/users/RegisterPage";
import UserProfilePage from "./pages/users/UserProfilePage";
import SandboxPage from "./pages/admin/SandboxPage";
import ErrorPage from "./pages/ErrorPage";

export const ROUTES = {
  root: "/",
  about: "/about",
  cards: "/cards",
  myCards: "/my-cards",
  favCards: "/fav-cards",
  cardInfo: "/card-info",
  createCard: "/create-card",
  editCard: "/edit-card",
  login: "/login",
  register: "/register",
  userProfile: "/user-info",
  editUser: "/edit-user",
  sandbox: "/sandbox",
};

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.root} element={<CardsPage />} />
      <Route path={`${ROUTES.cardInfo}/:id`} element={<CardInfoPage />} />

      <Route path={ROUTES.register} element={<RegisterPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />

      {/* <Route path={ROUTES.about}>
        <AboutPage />
      </Route>

      <Route path={ROUTES.cards}>
        <CardsPage />
      </Route>
      <Route path={ROUTES.myCards}>
        <MyCardsPage />
      </Route>

      <Route path={ROUTES.favCards}>
        <FavoriteCardsPage />
      </Route>
      <Route path={`${ROUTES.cardInfo}/:id`}>
        <CardInfoPage />
      </Route>
      <Route path={ROUTES.createCard}>
        <AddCardPage />
      </Route>
      <Route path={ROUTES.editCard}>
        <EditCardPage />
      </Route>

      <Route path={ROUTES.login}>
        <LoginPage />
      </Route>
      <Route path={ROUTES.register}>
        <RegisterPage />
      </Route>
      <Route path={ROUTES.userProfile}>
        <UserProfilePage />
      </Route>
      <Route path={ROUTES.sandbox}>
        <SandboxPage />
      </Route>

      <Route path="*">
        <ErrorPage />
      </Route> */}
    </Routes>
  );
}