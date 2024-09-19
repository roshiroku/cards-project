import { useCallback, useEffect, useState } from "react";
import UsersTable from "../../components/users/UsersTable";
import { useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import UserModel from "../../models/UserModel";
import ContentLoader from "../../components/layout/ContentLoader";
import PaginationProvider from "../../providers/PaginationProvider";
import SortProvider from "../../providers/SortProvider";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import { useSearch } from "../../providers/SearchProvider";
import { Box, Container, Typography } from "@mui/material";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const { user } = useAuthentication();
  const { setNotificationMessage } = usePageUI();
  const { searchText } = useSearch();

  const loadUsers = useCallback(async () => {
    const allUsers = await UserModel.loadAll();
    const users = searchText ? allUsers.filter(user => user.matches(searchText)) : allUsers;
    setUsers(users);
  }, [searchText]);

  useLoadEffect(async () => {
    const isCached = !!UserModel.cache.all;
    await loadUsers();
    !isCached && setNotificationMessage("Users loaded successfully.");
  }, []);

  useEffect(() => {
    UserModel.cache.all && loadUsers();
  }, [searchText]);

  return (
    <Container sx={{ py: 6 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Management
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          View, search, and manage all registered users within the platform.
        </Typography>
      </Box>
      <ContentLoader>
        {user?.isAdmin ? (
          <PaginationProvider itemCount={users.length}>
            <SortProvider>
              <UsersTable users={users} />
            </SortProvider>
          </PaginationProvider>
        ) : (
          <Navigate to={ROUTES.root} replace />
        )}
      </ContentLoader>
    </Container>
  );
}
