import { AppBar, Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Router";
import avatarURL from "../../assets/avatar.png";

export default function Header() {
  const user = null;

  return (
    <AppBar position="sticky">
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
        <Box>
          <Link to={ROUTES.root}>
            <Typography variant="h4" color="white">KCard</Typography>
          </Link>
          <Link to={ROUTES.about}>ABOUT</Link>
          <Link to={ROUTES.favCards}>FAV CARDS</Link>
          <Link to={ROUTES.myCards}>MY CARDS</Link>
          <Link to={ROUTES.sandbox}>SANDBOX</Link>
        </Box >
        <Box>
          {user &&
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}>
                <Avatar alt="avatar" src={avatarURL} />
              </IconButton>
            </Tooltip>}
          <Link to={ROUTES.register}>SIGNUP</Link>
          <Link to={ROUTES.login}>LOGIN</Link>
        </Box>
      </Box >
    </AppBar>
  );

}