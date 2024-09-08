import { useCallback, useMemo } from "react";
import UserAvatar from "./UserAvatar";
import { capitalize, ucFirst } from "../../utils/string";
import DataTable from "../tables/DataTable";
import { usePagination } from "../../providers/PaginationProvider";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useSorting } from "../../providers/SortingProvider";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Router";
import { Check, Delete, Edit } from "@mui/icons-material";
import UserModel from "../../models/UserModel";
import { useLoadCallback, usePageUI } from "../../providers/PageUIProvider";

const COLUMNS = [
  { id: "user", label: "User", primary: true, sort: (a, b) => a.email.localeCompare(b.email) },
  { id: "name", disablePadding: true, label: "Name", sort: true },
  { id: "country", disablePadding: true, label: "Country", sort: true },
  { id: "status", disablePadding: true, label: "Status", sort: true },
  { id: "admin", disablePadding: true, label: "Admin", sort: true },
  { id: "actions", disablePadding: true, label: "Actions" }
];

export default function UsersTable({ users }) {
  const { setNotification } = usePageUI();
  const { page, setPage, perPage, setPerPage } = usePagination();
  const { sortBy: orderBy, setSortBy: setOrderBy, sortDir: order, setSortDir: setOrder } = useSorting();

  const rows = useMemo(() => users.map(user => ({
    id: user._id,
    user:
      <Box display="flex" alignItems="center" gap={3}>
        <UserAvatar user={user} /> {user.email}
      </Box>,
    email: user.email,
    name: capitalize(`${user.name.first} ${user.name.last}`),
    country: capitalize(user.address.country),
    status: user.isBusiness ? "Business" : "",
    admin: user.isAdmin ? <Check /> : "",
    actions: (
      <Box display="inline-flex">
        <Tooltip title="Edit">
          <IconButton LinkComponent={Link} to={ROUTES.editUser + `/${user._id}`}>
            <Edit />
          </IconButton>
        </Tooltip>
        {
          !user.isAdmin &&
          <Tooltip title="Delete">
            <IconButton onClick={() => onDelete(user._id)} children={<Delete />} />
          </Tooltip>
        }
      </Box>
    ),
    selectable: !user.isAdmin
  })), [users]);

  const onDelete = useLoadCallback(async (...ids) => {
    const count = ids.length;
    const label = `${count == 1 ? "" : count + " "}user${count == 1 ? "" : "s"}`;

    if (confirm(`Are you sure you want to delete ${label}`)) {
      const tasks = ids.map(id => UserModel.load(id).then(user => user.delete()));
      await Promise.all(tasks);
      setNotification({ message: `${ucFirst(label)} deleted`, severity: "success" });
    }
  }, []);

  const multiActions = useCallback(selected => {
    return (
      <Tooltip title="Delete">
        <IconButton onClick={() => onDelete(...selected)} children={<Delete />} />
      </Tooltip>
    );
  }, []);

  return (
    <DataTable
      title="Users"
      columns={COLUMNS}
      {...{
        rows,
        page,
        setPage,
        perPage,
        setPerPage,
        orderBy,
        setOrderBy,
        order,
        setOrder,
        multiActions
      }}
    />
  );
}