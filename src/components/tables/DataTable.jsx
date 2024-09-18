import { Paper, Slide, Table, TableContainer, TablePagination } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import DataTableToolbar from "./DataTableToolbar";
import DataTableHead from "./DataTableHead";
import DataTableBody from "./DataTableBody";

export default function DataTable({
  rows,
  columns,
  order = "asc",
  setOrder,
  orderBy,
  setOrderBy,
  page = 1,
  setPage,
  perPage: rowsPerPage = 5,
  setPerPage: setRowsPerPage,
  multiActions
}) {
  const [selected, setSelected] = useState([]);

  const sort = useMemo(() => columns.find(({ id }) => id == orderBy)?.sort, [orderBy]);

  const onSelectAll = useCallback(e => {
    if (e.target.checked) {
      setSelected(rows.filter(({ selectable }) => selectable).map(n => n.id));
    } else {
      setSelected([]);
    }
  }, [rows]);

  const onPageChange = useCallback((_, newPage) => setPage(newPage + 1), [setPage]);

  const onRowsPerPageChange = useCallback(e => setRowsPerPage(Number(e.target.value)), [setRowsPerPage]);

  const visibleRows = useMemo(() =>
    [...rows]
      .sort((a, b) => {
        const propA = a[orderBy];
        const propB = b[orderBy];

        if (typeof sort == "function") {
          return (order == "asc" ? 1 : -1) * sort(a, b);
        } else if (order == "asc") {
          return typeof propA == "string" ? propA.localeCompare(propB) : propA - propB;
        } else {
          return typeof propB == "string" ? propB.localeCompare(propA) : propB - propA;
        }
      })
      .slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [rows, order, orderBy, page, rowsPerPage]);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table size="medium">
          <DataTableHead
            numSelected={selected.length}
            rowCount={rows.length}
            checkbox={!!multiActions}
            {...{ columns, order, setOrder, orderBy, setOrderBy, onSelectAll }}
          />
          <DataTableBody rows={visibleRows} checkbox={!!multiActions} {...{ columns, selected, setSelected }} />
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={Math.max(0, page - 1)}
        showFirstButton
        showLastButton
        {...{ rowsPerPage, onPageChange, onRowsPerPageChange }}
      />
      {
        multiActions &&
        <Slide direction="up" in={!!selected.length}>
          <DataTableToolbar {...{ selected, multiActions, onSelectAll }} rowCount={rows.length} />
        </Slide>
      }
    </Paper>
  );
}