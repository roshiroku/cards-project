import { useContext, useEffect, useMemo } from "react";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { navLinks } from "./NavLinks";
import { Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, AppBar, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { AccountCircle, Close, Login, Logout, PersonAdd } from "@mui/icons-material";
import { ROUTES } from "../../Router";
import UserAvatar from "../users/UserAvatar";
import { HeaderSearch } from "./Header";
import { SearchContext } from "../../providers/SearchProvider";
import Logo from "./Logo";

export default function MobileNav({ isOpen, setIsOpen, sx }) {
  const location = useLocation();
  const { user, logout } = useAuthentication();
  const { showSearch } = useContext(SearchContext);
  const links = useMemo(() => navLinks(user), [user]);

  // Define additional links based on user state
  const userLinks = useMemo(() => user ? [
    { to: ROUTES.userProfile, label: "Profile", icon: <AccountCircle /> },
    { action: logout, label: "Logout", icon: <Logout /> },
  ] : [
    { to: ROUTES.login, label: "Login", icon: <Login /> },
    { to: ROUTES.register, label: "Register", icon: <PersonAdd /> },
  ], [user, logout]);

  useEffect(() => {
    setIsOpen(false);
  }, [location])

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)} sx={sx}>
      <Box sx={{ width: 250 }}>
        <AppBar
          position="static"
          component="div"
          sx={{
            px: 2,
            py: 1,
            boxShadow: "none"
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
            <Logo variant="h5" />
            <IconButton color="inherit" onClick={() => setIsOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </AppBar>

        {/* User Avatar and Email */}
        {/* {user && (
          <AppBar
            position="static"
            component="div"
            sx={{
              px: 2,
              py: 1,
              boxShadow: "none"
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <UserAvatar user={user} />
              <Typography variant="subtitle1">
                {user.email}
              </Typography>
            </Box>
          </AppBar>
        )} */}

        {/* Search Input */}
        {showSearch && (
          <>
            <Box sx={{ px: 2, py: 1 }} onClick={(e) => e.stopPropagation()}>
              <HeaderSearch />
            </Box>
            <Divider />
          </>
        )}

        {/* Primary Navigation Links */}
        <List>
          {links.map(({ to, label, icon }) => (
            <ListItem key={to} disablePadding>
              <ListItemButton component={Link} to={to}>
                <ListItemIcon children={icon} />
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Additional Links */}
        <List>
          {userLinks.map(({ to, label, icon, action }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton
                component={to ? Link : "button"}
                to={to}
                onClick={() => action && action()}
              >
                <ListItemIcon children={icon} />
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
