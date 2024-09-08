import { useState } from "react";
import UsersTable from "../../components/users/UsersTable";
import { useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import UserModel from "../../models/UserModel";
import PageContent from "../../components/layout/PageContent";
import PaginationProvider from "../../providers/PaginationProvider";
import SortingProvider from "../../providers/SortingProvider";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Router";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { user } = useAuthentication();
  const { setNotification } = usePageUI();

  useLoadEffect(async () => {
    const isCached = !!UserModel.cache.all;
    setUsers(await UserModel.loadAll());
    !isCached && setNotification({ message: "Users loaded", severity: "success" });
  }, []);

  return (
    <PageContent>
      {
        user?.isAdmin ?
          <PaginationProvider itemCount={users.length}>
            <SortingProvider>
              <UsersTable users={users} />
            </SortingProvider>
          </PaginationProvider> :
          <Navigate to={ROUTES.root} replace />
      }
    </PageContent>
  );
}