import { AppBar, Box, CircularProgress, Container, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography, useMediaQuery } from "@mui/material"
import { forwardRef, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from "react"
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

  const { user, isLoggingIn } = useAuthentication();
  const { isDarkMode, setIsDarkMode } = useTheme();
  const md = useMediaQuery(theme => theme.breakpoints.down("md"));

  const [_, ...links] = useMemo(() => navLinks(user), [user]);

  return (
    <>
      <AppBar position="sticky" elevation={10}>
        <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}>
          <Box display="flex" gap={2} alignItems="center">
            {md && (
              <Tooltip title="Open Menu">
                <IconButton color="inherit" onClick={() => setIsDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}
            <Link to={ROUTES.root}>
              <Logo sx={{ typography: { xs: "h5", md: "h4" } }} />
            </Link>
            {!md && (
              <Typography display="flex" gap={2} variant="button" component="div">
                <NavLinks items={links} />
              </Typography>
            )}
          </Box >
          <Box display="flex" gap={2} alignItems="center">
            {!md && <HeaderSearch />}
            <Tooltip title={`Enable ${isDarkMode ? "Light" : "Dark"} Mode`}>
              <IconButton color="inherit" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <LightMode /> : <ModeNight />}
              </IconButton>
            </Tooltip>
            {!md && (
              isLoggingIn ? (
                <Box>
                  <CircularProgress />
                </Box>
              ) : (
                user ? (
                  <AccountMenu />
                ) : (
                  <Typography display="flex" variant="button" component="div" gap={2}>
                    <Link style={{ color: "inherit" }} to={ROUTES.register}>Register</Link>
                    <Link style={{ color: "inherit" }} to={ROUTES.login}>Login</Link>
                  </Typography>
                )
              ))}
          </Box>
        </Container>
      </AppBar>
      {md && <MobileNav isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />}
    </>
  );
}

export const HeaderSearch = forwardRef(function ({ sx = {} }, ref) {
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

  return showSearch && <SearchInput {...{ value, onChange, sx, ref }} />;
});

export function AccountMenu({ sx = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const anchor = useRef();

  const { user, logout } = useAuthentication();

  return (
    <>
      <Tooltip title="User Settings">
        <IconButton sx={{ p: 0, ...sx }} onClick={() => setIsOpen(prev => !prev)} ref={anchor}>
          <UserAvatar user={user} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchor.current}
        id="account-menu"
        open={isOpen}
        onClick={() => setIsOpen(false)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ mt: 1.5 }}
        component="div"
      >
        <MenuItem component="div" sx={{ pointerEvents: "none" }}>
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
