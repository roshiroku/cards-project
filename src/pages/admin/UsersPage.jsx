import { useState } from "react";
import UsersTable from "../../components/users/UsersTable";
import { useLoadEffect } from "../../providers/PageUIProvider";
import UserModel from "../../models/UserModel";
import PageContent from "../../components/layout/PageContent";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useLoadEffect(async () => {
    setUsers(await UserModel.loadAll());
  }, []);

  return (
    <PageContent>
      <UsersTable users={users} />
    </PageContent>
  );
}