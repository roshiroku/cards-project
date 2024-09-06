import { memo, useMemo } from "react";
import UserAvatar from "./UserAvatar";
import { capitalize } from "../../utils/string";
import DataTable from "../tables/DataTable";
import { usePagination } from "../../providers/PaginationProvider";
import { Box } from "@mui/material";
import { useSort } from "../../providers/SortProvider";

const COLUMNS = [
  {
    id: "user",
    label: "User",
    primary: true,
    sort: (a, b) => b.email.localeCompare(a.email)
  },
  {
    id: "name",
    disablePadding: true,
    label: "Name",
    sort: true
  },
  {
    id: "country",
    disablePadding: true,
    label: "Country",
    sort: true
  },
  {
    id: "type",
    disablePadding: true,
    label: "Type",
    sort: true
  },
];

export default function UsersTable({ users }) {
  const rows = useMemo(() => users.map(user => ({
    id: user._id,
    user:
      <Box display="flex" alignItems="center" gap={3}>
        <UserAvatar user={user} /> {user.email}
      </Box>,
    email: user.email,
    name: capitalize(`${user.name.first} ${user.name.last}`),
    country: capitalize(user.address.country),
    type: user.isAdmin ? "Admin" : user.isBusiness ? "Business" : ""
  })), [users]);

  const { page, setPage, perPage, setPerPage } = usePagination();
  const { sortBy: orderBy, setSortBy: setOrderBy, sortDir: order, setSortDir: setOrder } = useSort();

  return (
    <DataTable
      title="Users"
      columns={COLUMNS}
      {...{ rows, page, setPage, perPage, setPerPage, orderBy, setOrderBy, order, setOrder }}
    />
  );
}