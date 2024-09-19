import { Paper, Slide, Table, TableContainer, TablePagination } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import DataTableToolbar from "./DataTableToolbar";
import DataTableHead from "./DataTableHead";
import DataTableBody from "./DataTableBody";

export default function DataTable({
  rows: allRows,
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

  const rows = useMemo(() =>
    [...allRows]
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
    [allRows, order, orderBy, page, rowsPerPage]);

  const onSelectAll = useCallback(e => {
    if (e.target.checked) {
      setSelected(allRows.filter(({ selectable }) => selectable).map(n => n.id));
    } else {
      setSelected([]);
    }
  }, [allRows]);

  const onPageChange = useCallback((_, newPage) => setPage(newPage + 1), [setPage]);

  const onRowsPerPageChange = useCallback(e => setRowsPerPage(Number(e.target.value)), [setRowsPerPage]);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table size="medium">
          <DataTableHead
            numSelected={selected.length}
            rowCount={allRows.length}
            checkbox={!!multiActions}
            {...{ columns, order, setOrder, orderBy, setOrderBy, onSelectAll }}
          />
          <DataTableBody checkbox={!!multiActions} {...{ rows, columns, selected, setSelected }} />
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={allRows.length}
        page={Math.max(0, page - 1)}
        showFirstButton
        showLastButton
        {...{ rowsPerPage, onPageChange, onRowsPerPageChange }}
      />
      {multiActions && (
        <Slide direction="up" in={!!selected.length}>
          <DataTableToolbar {...{ selected, multiActions, onSelectAll }} rowCount={allRows.length} />
        </Slide>
      )}
    </Paper>
  );
}
