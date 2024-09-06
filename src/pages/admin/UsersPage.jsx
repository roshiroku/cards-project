import { useState } from "react";
import UsersTable from "../../components/users/UsersTable";
import { useLoadEffect } from "../../providers/PageUIProvider";
import UserModel from "../../models/UserModel";
import PageContent from "../../components/layout/PageContent";
import PaginationProvider from "../../providers/PaginationProvider";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useLoadEffect(async () => {
    setUsers(await UserModel.loadAll());
  }, []);

  return (
    <PageContent>
      <PaginationProvider itemCount={users.length} perPage={10}>
        <UsersTable users={users} />
      </PaginationProvider>
    </PageContent>
  );
}