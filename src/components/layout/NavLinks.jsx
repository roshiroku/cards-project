import { Link } from "react-router-dom";
import { ROUTES } from "../../Router";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useMemo } from "react";
import { Collections, Favorite, Home, Info, People, Style } from "@mui/icons-material";

export function navLinks(user) {
  return [
    { to: ROUTES.root, label: "Home", icon: <Home /> },
    { to: ROUTES.cards, label: "Cards", icon: <Style /> },
    user && { to: ROUTES.favCards, label: "Fav Cards", icon: <Favorite /> },
    user?.isBusiness && { to: ROUTES.myCards, label: "My Cards", icon: <Collections /> },
    { to: ROUTES.about, label: "About", icon: <Info /> },
    user?.isAdmin && { to: ROUTES.users, label: "CRM", icon: <People /> }
  ].filter(Boolean);
}

export default function NavLinks({ items }) {
  const { user } = useAuthentication();
  
  const links = useMemo(() => items || navLinks(user), [items, user]);

  return links.map(({ to, label }) => (
    <Link key={to} to={to} style={{ color: "inherit" }}>{label}</Link>
  ));
}
