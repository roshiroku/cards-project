import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import { Favorite, Info, Portrait, Style } from "@mui/icons-material";

export default function Footer() {
  const navigate = useNavigate();
  const user = null;

  return (
    <Paper elevation={3}>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="About"
          icon={<Info />}
          onClick={() => navigate(ROUTES.about)}
        />
        <BottomNavigationAction
          label="Cards"
          icon={<Style />}
          onClick={() => navigate(ROUTES.cards)}
        />
        {user && <BottomNavigationAction
          label="Fav Cards"
          icon={<Favorite />}
          onClick={() => navigate(ROUTES.favCards)}
        />}
        {(user && user.isBusiness) && <BottomNavigationAction
          label="My Cards"
          icon={<Portrait />}
          onClick={() => navigate(ROUTES.myCards)}
        />}
      </BottomNavigation>
    </Paper>
  );
}