import { useState } from "react";
import UsersTable from "../../components/users/UsersTable";
import { useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import UserModel from "../../models/UserModel";
import PageContent from "../../components/layout/PageContent";
import PaginationProvider from "../../providers/PaginationProvider";
import SortingProvider from "../../providers/SortingProvider";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { setNotification } = usePageUI();

  useLoadEffect(async () => {
    const isCached = !!UserModel.cache.all;
    setUsers(await UserModel.loadAll());
    !isCached && setNotification({ message: "Users loaded", severity: "success" });
  }, []);

  return (
    <PageContent>
      <PaginationProvider itemCount={users.length}>
        <SortingProvider>
          <UsersTable users={users} />
        </SortingProvider>
      </PaginationProvider>
    </PageContent>
  );
}