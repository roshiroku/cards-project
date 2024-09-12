import { AppBar, Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, styled, Tooltip, Typography } from "@mui/material"
import { useCallback, useContext, useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../Router"
import { Settings, Logout, LightMode, ModeNight } from "@mui/icons-material/";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useTheme } from "../../providers/ThemeProvider";
import SearchInput from "../forms/SearchInput";
import { SearchContext, useSearch } from "../../providers/SearchProvider";
import debounce from "debounce";

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

  return (
    <AppBar position="sticky" elevation={10}>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
        <Box display="flex" gap={2}>
          <Link to={ROUTES.root}>
            <Typography variant="h4"> KCard </Typography>
          </Link >
          <NavLink to={ROUTES.about}>ABOUT</NavLink>
          {user && <NavLink to={ROUTES.favCards}>FAV CARDS</NavLink>}
          {(user?.isBusiness || user?.isAdmin) && <NavLink to={ROUTES.myCards}>MY CARDS</NavLink>}
          {user?.isAdmin && <NavLink to={ROUTES.users}>CRM</NavLink>}
        </Box >
        <Box display="flex" gap={2} alignItems="center">
          <HeaderSearch />
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
}

export function HeaderSearch() {
  const { searchText, setSearchText, showSearch } = useContext(SearchContext);
  const [value, setValue] = useState(searchText);

  const setSearchTextDebounced = useCallback(debounce(setSearchText, 64), [setSearchText]);

  const onChange = useCallback(input => {
    setValue(input);
    setSearchTextDebounced(input);
  }, [setSearchTextDebounced]);

  useLayoutEffect(() => {
    if (searchText != value) {
      setValue(searchText);
    }
  }, [searchText]);

  return showSearch && <SearchInput {...{ value, onChange }} />;
}

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
          <Link to={ROUTES.userProfile}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </Link>
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