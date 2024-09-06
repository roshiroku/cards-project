import { memo, useMemo } from "react";
import UserAvatar from "./UserAvatar";
import { capitalize } from "../../utils/string";
import DataTable from "../tables/DataTable";
import { usePagination } from "../../providers/PaginationProvider";

const HEAD_CELLS = [
  {
    id: "avatar"
  },
  {
    id: "email",
    disablePadding: true,
    label: "Email",
    primary: true,
    sortable: true
  },
  {
    id: "name",
    disablePadding: true,
    label: "Name",
    sortable: true
  },
  {
    id: "country",
    disablePadding: true,
    label: "Country",
    sortable: true
  },
  {
    id: "type",
    disablePadding: true,
    label: "Type",
    sortable: true
  },
];

export default function UsersTable({ users }) {
  const rows = useMemo(() => users.map(user => ({
    id: user._id,
    avatar: <UserAvatar user={user} />,
    email: user.email,
    name: capitalize(`${user.name.first} ${user.name.last}`),
    country: capitalize(user.address.country),
    type: user.isAdmin ? "Admin" : user.isBusiness ? "Business" : ""
  })), [users]);

  const { page, setPage, perPage, setPerPage } = usePagination();
  
  return <DataTable title="Users" headCells={HEAD_CELLS} {...{ rows, page, setPage, perPage, setPerPage }} />;
}