import { AppBar, Box, Container, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../../Router"
import { Settings, Logout, LightMode, ModeNight, AccountCircle, Menu as MenuIcon } from "@mui/icons-material/";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useTheme } from "../../providers/ThemeProvider";
import SearchInput from "../forms/SearchInput";
import { SearchContext } from "../../providers/SearchProvider";
import debounce from "debounce";
import Logo from "./Logo";
import NavLinks, { navLinks } from "./NavLinks";
import UserAvatar from "../users/UserAvatar";
import MobileNav from "./MobileNav";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useAuthentication();
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [_, ...links] = useMemo(() => navLinks(user), [user]);
  const hide = { xs: "none", md: "flex" };
  const show = { xs: "flex", md: "none" };
  const logoFontSize = { xs: "1.5rem", md: "2.125rem" };

  return (
    <>
      <AppBar position="sticky" elevation={10}>
        <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}>
          <Box display="flex" gap={2} alignItems="center">
            <IconButton color="inherit" onClick={() => setIsDrawerOpen(prev => !prev)} sx={{ display: show }}>
              <MenuIcon />
            </IconButton>
            <Link to={ROUTES.root}>
              <Logo sx={{ fontSize: logoFontSize }} />
            </Link>
            <Typography display={hide} gap={2} variant="button" component="div">
              <NavLinks items={links} />
            </Typography>
          </Box >
          <Box display="flex" gap={2} alignItems="center">
            <HeaderSearch sx={{ display: hide }} />
            <IconButton color="inherit" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <LightMode /> : <ModeNight />}
            </IconButton>
            {user ?
              <AccountMenu sx={{ display: hide }} /> :
              <Typography display={hide} variant="button" component="div" gap={2}>
                <Link style={{ color: "inherit" }} to={ROUTES.register}>Register</Link>
                <Link style={{ color: "inherit" }} to={ROUTES.login}>Login</Link>
              </Typography>
            }
          </Box>
        </Container>
      </AppBar>
      <MobileNav sx={{ display: show }} isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </>
  );
}

export function HeaderSearch({ sx = {} }) {
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

  return showSearch && <SearchInput {...{ value, onChange, sx }} />;
}

export function AccountMenu({ sx = {} }) {
  const anchor = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthentication();
  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <Tooltip title="User Settings">
        <IconButton sx={{ p: 0, ...sx }} onClick={toggleMenu} ref={anchor}>
          <UserAvatar user={user} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchor.current}
        id="account-menu"
        open={isOpen}
        onClick={closeMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ mt: 1.5 }}
        component="div"
      >
        <MenuItem component="div">
          <ListItemIcon children={<AccountCircle />} />
          {user.email}
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to={ROUTES.userProfile}>
          <ListItemIcon children={<Settings fontSize="small" />} />
          Settings
        </MenuItem>
        <MenuItem compoennt="div" onClick={logout}>
          <ListItemIcon children={<Logout fontSize="small" />} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}