import { useCallback, useMemo } from "react";
import UserAvatar from "./UserAvatar";
import { capitalize, ucFirst } from "../../utils/string";
import DataTable from "../tables/DataTable";
import { usePagination } from "../../providers/PaginationProvider";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useSort } from "../../providers/SortProvider";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Router";
import { Check, Delete, Edit, Work, WorkOutline } from "@mui/icons-material";
import UserModel from "../../models/UserModel";
import { useLoadCallback, usePageUI } from "../../providers/PageUIProvider";

const COLUMNS = [
  { id: "user", label: "User", primary: true, sort: (a, b) => a.email.localeCompare(b.email) },
  { id: "created", label: "Joined", sort: (a, b) => a.createdAt - b.createdAt },
  { id: "name", disablePadding: true, label: "Name", sort: true },
  { id: "country", disablePadding: true, label: "Country", sort: true },
  { id: "status", disablePadding: true, label: "Status", sort: true },
  { id: "admin", disablePadding: true, label: "Admin", sort: true },
  { id: "actions", disablePadding: true, label: "Actions" }
];

export default function UsersTable({ users }) {
  const { setNotificationMessage, confirm } = usePageUI();
  const { page, setPage, perPage, setPerPage } = usePagination();
  const { sortBy: orderBy, setSortBy: setOrderBy, sortDir: order, setSortDir: setOrder } = useSort();

  const onToggleBusiness = useLoadCallback(async (isBusiness, ...ids) => {
    const count = ids.length;
    const label = `${count == 1 ? "" : count + " "}user${count == 1 ? "" : "s"}`;
    const tasks = ids.map(id => UserModel.load(id).then(user => user.toggleBusinessStatus(isBusiness)));
    await Promise.all(tasks);
    setNotificationMessage(`Changed ${label} to ${isBusiness ? "" : "non-"}business status successfully.`);
  }, []);

  const handleDelete = useLoadCallback(async (...ids) => {
    const tasks = ids.map(id => UserModel.load(id).then(user => user.delete()));
    await Promise.all(tasks);
  }, []);

  const onDelete = useCallback(async (...ids) => {
    const count = ids.length;
    const userPlural = `${count == 1 ? "" : count + " "}user${count == 1 ? "" : "s"}`;

    if (await confirm("Delete User", `Are you sure you want to delete ${count == 1 ? "this" : "these"} ${userPlural}`)) {
      await handleDelete(...ids);
      setNotificationMessage(`${ucFirst(userPlural)} ${count == 1 ? "has" : "have"} been deleted.`);
    }
  }, []);

  const multiActions = useCallback(selected => <MultiActions {...{ selected, onToggleBusiness, onDelete }} />);

  const rows = useMemo(() => users.map(user => ({
    id: user._id,
    user:
      <Box display="flex" alignItems="center" gap={3}>
        <UserAvatar user={user} /> {user.email}
      </Box>,
    email: user.email,
    created: user.createdAt.toLocaleDateString(),
    createdAt: user.createdAt,
    name: user.shortName,
    country: capitalize(user.address.country),
    status: `${user.isBusiness ? "" : "Non-"}Business`,
    admin: user.isAdmin ? <Check /> : "",
    actions: <Actions {...{ user, onToggleBusiness, onDelete }} />,
    selectable: true,
    matches: user.matches.bind(user)
  })), [users]);

  return (
    <DataTable
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

function Actions({ user, onToggleBusiness, onDelete }) {
  return (
    <Box display="flex">
      <Tooltip title={`Change to ${user.isBusiness ? "non-" : ""}business`}>
        <IconButton onClick={() => onToggleBusiness(!user.isBusiness, user._id)}>
          {user.isBusiness ? <Work /> : <WorkOutline />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton LinkComponent={Link} to={ROUTES.editUser + `/${user._id}`}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title={user.isAdmin ? "" : "Delete"}>
        <IconButton
          disabled={user.isAdmin}
          onClick={e => {
            e.stopPropagation();
            onDelete(user._id);
          }}
          children={<Delete />}
        />
      </Tooltip>
    </Box>
  );
}

function MultiActions({ selected, onToggleBusiness, onDelete }) {
  const canDelete = useMemo(() => !selected.some(id => UserModel.cache[id]?.isAdmin), [selected]);

  return (
    <>
      <Tooltip title="Change to non-business">
        <IconButton onClick={() => onToggleBusiness(false, ...selected)} children={<WorkOutline />} />
      </Tooltip>
      <Tooltip title="Change to business">
        <IconButton onClick={() => onToggleBusiness(true, ...selected)} children={<Work />} />
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton disabled={!canDelete} onClick={() => onDelete(...selected)} children={<Delete />} />
      </Tooltip>
    </>
  );
}
