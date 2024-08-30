import { AppBar, Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, styled, Tooltip, Typography } from "@mui/material"
import React, { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../Router"
import { Settings, Logout, LightMode, ModeNight } from "@mui/icons-material/";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useTheme } from "../../providers/ThemeProvider";
import SearchInput from "../forms/SearchInput";
import { SearchContext, useSearch } from "../../providers/SearchProvider";

const NavLink = styled(Link)(({ theme }) => `
  text-decoration: none;
  color: inherit;
  font-family: Roboto;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  padding: ${theme.spacing(1)};`
);

export default function Header() {
  const { user } = useAuthentication();
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { searchText, setSearchTextDebounced, showSearch } = useContext(SearchContext);

  return (
    <AppBar position="sticky" elevation={10}>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
        <Box display="flex" gap={2}>
          <Link to={ROUTES.root}>
            <Typography variant="h4"> KCard </Typography>
          </Link >
          <NavLink to={ROUTES.about}>ABOUT</NavLink>
          {
            user &&
            <>
              <NavLink to={ROUTES.favCards}>FAV CARDS</NavLink>
              {user.isBusiness && <NavLink to={ROUTES.myCards}>MY CARDS</NavLink>}
              {user.isAdmin && <NavLink to={ROUTES.sandbox}>SANDBOX</NavLink>}
            </>
          }
        </Box >
        <Box display="flex" gap={2} alignItems="center">
          {showSearch && <SearchInput defaultValue={searchText} onChange={setSearchTextDebounced} />}
          <IconButton color="inherit" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <LightMode /> : <ModeNight />}
          </IconButton>
          {user ?
            <AccountMenu /> :
            <>
              <NavLink to={ROUTES.register}>SIGNUP</NavLink>
              <NavLink to={ROUTES.login}>LOGIN</NavLink>
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
        <IconButton sx={{ p: 0 }} onClick={toggleMenu} ref={anchor}>
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
        sx={{ mt: 1.5 }}
      >
        <MenuItem>
          <Avatar sx={{ mr: 1.5 }} />
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