import { Link } from "react-router-dom";
import { ROUTES } from "../../Router";
import { useAuthentication } from "../../providers/AuthenticationProvider";

export default function NavLinks() {
  const { user } = useAuthentication();

  return (
    <>
      <Link style={{ color: "inherit" }} to={ROUTES.cards}>Cards</Link>
      {user && <Link style={{ color: "inherit" }} to={ROUTES.favCards}>Fav Cards</Link>}
      {user?.isBusiness && <Link style={{ color: "inherit" }} to={ROUTES.myCards}>My Cards</Link>}
      <Link style={{ color: "inherit" }} to={ROUTES.about}>About</Link>
      {user?.isAdmin && <Link style={{ color: "inherit" }} to={ROUTES.users}>CRM</Link>}
    </>
  );
}