import { AppBar, Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import React, { useCallback, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../Router"
import { Settings, Logout } from "@mui/icons-material/";
import { useAuthentication } from "../../providers/AuthenticationProvider";


export const navBarStyles = {
  navLink: {
    textDecoration: "none",
    color: "white"/* theme.palette.text.primary */,
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "0.875rem", /* 14px */
    lineHeight: 1.75,
    letterSpacing: "0.02857em",
    padding: "6px",
  },
  rightBox: {
    display: "flex",
    gap: "2", // Adjust spacing between links
  },
  leftBox: {
    display: "flex",
    gap: "2",
    alignItems: "center",
  },
};

export default function Header() {
  const { user } = useAuthentication();
  return (
    <AppBar position="sticky" color="primary" elevation={10}>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding="8px">
        <Box sx={navBarStyles.leftBox}>
          <Link to={ROUTES.root}>
            <Typography variant="h4"> KCard </Typography>
          </Link >
          <Link to={ROUTES.about} style={navBarStyles.navLink}>ABOUT</Link>
          <Link to={ROUTES.favCards} style={navBarStyles.navLink}>FAV CARDS</Link>
          <Link to={ROUTES.myCards} style={navBarStyles.navLink}>MY CARDS</Link>
          <Link to={ROUTES.sandbox} style={navBarStyles.navLink}>SANDBOX</Link>
        </Box >
        <Box sx={navBarStyles.rightBox}>
          {user ?
            <AccountMenu /> :
            <>
              <Link to={ROUTES.register} style={navBarStyles.navLink}>SIGNUP</Link>
              <Link to={ROUTES.login} style={navBarStyles.navLink}>LOGIN</Link>
            </>
          }
        </Box>
      </Box>
    </AppBar>
  );
};

export function AccountMenu() {
  const anchor = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthentication();
  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <Tooltip title="User Settings">
        <IconButton sx={{ p: 0, display: "inline-flex", marginLeft: 2 }} onClick={toggleMenu} ref={anchor}>
          <Avatar alt="avatar" src="../assets/avatar.png" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchor.current}
        id="account-menu"
        open={isOpen}
        onClick={closeMenu}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        sx={{ marginTop: 1.5 }}
      >
        <MenuItem>
          <Avatar sx={{ marginRight: 1.5 }} />
          {user.email}
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}