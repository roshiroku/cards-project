import { Route, Routes } from "react-router-dom";
import CardsPage from "./pages/cards/CardsPage";
import AboutPage from "./pages/AboutPage";
import MyCardsPage from "./pages/cards/MyCardsPage";
import FavoriteCardsPage from "./pages/cards/FavoriteCardsPage";
import CardInfoPage from "./pages/cards/CardInfoPage";
import LoginPage from "./pages/users/LoginPage";
import RegisterPage from "./pages/users/RegisterPage";
import UserProfilePage from "./pages/users/UserProfilePage";
import ErrorPage from "./pages/ErrorPage";
import CardFormPage from "./pages/cards/CardFormPage";
import UsersPage from "./pages/admin/UsersPage";
import UserEditPage from "./pages/admin/UserEditPage";
import HomePage from "./pages/HomePage";

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
  users: "/users",
  error: "/error"
};

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.root} element={<HomePage />} />

      <Route path={ROUTES.about} element={<AboutPage />} />

      <Route path={ROUTES.cards} element={<CardsPage />} />
      <Route path={ROUTES.myCards} element={<MyCardsPage />} />
      <Route path={ROUTES.favCards} element={<FavoriteCardsPage />} />
      <Route path={`${ROUTES.cardInfo}/:id`} element={<CardInfoPage />} />
      <Route path={ROUTES.createCard} element={<CardFormPage />} />
      <Route path={`${ROUTES.editCard}/:id`} element={<CardFormPage />} />

      <Route path={ROUTES.register} element={<RegisterPage />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.userProfile} element={<UserProfilePage />} />

      <Route path={ROUTES.users} element={<UsersPage />} />
      <Route path={`${ROUTES.editUser}/:id`} element={<UserEditPage />} />

      <Route path={`${ROUTES.error}/:status`} element={<ErrorPage />} />

      <Route path={"*"} element={<ErrorPage status={404} />} />
    </Routes>
  );
}