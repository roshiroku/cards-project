import { Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material";
import { memo, useCallback, useMemo, useState } from "react";
import DataTableToolbar from "./DataTableToolbar";
import DataTableHead from "./DataTableHead";

export default memo(function DataTable({ title, rows, headCells }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onSort = useCallback((_, prop) => {
    const isAsc = orderBy == prop && order == "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(prop);
  }, [order, orderBy]);

  const onSelectAll = useCallback(e => {
    if (e.target.checked) {
      setSelected(rows.map(n => n.id));
    } else {
      setSelected([]);
    }
  }, [rows]);

  const onRowClick = useCallback((_, id) => {
    const index = selected.indexOf(id);
    const newSelected = [...selected];

    if (index == -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(index, 1);
    }

    setSelected(newSelected);
  }, [selected]);

  const onPageChange = useCallback((_, newPage) => setPage(newPage), []);

  const onRowsPerPageChange = useCallback(e => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  }, []);

  const isRowSelected = useCallback(id => selected.includes(id), [selected]);

  // Avoid a layout jump when reaching the last page with empty rows.
  // todo maybe better approach to calc this?
  const emptyRows = useMemo(() => {
    return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  }, [rows, page, rowsPerPage]);

  const visibleRows = useMemo(() =>
    [...rows]
      .sort((a, b) => {
        a = a[orderBy];
        b = b[orderBy];

        if (order == "asc") {
          return typeof a == "string" ? a.localeCompare(b) : a - b;
        } else {
          return typeof b == "string" ? b.localeCompare(a) : b - a;
        }
      })
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, order, orderBy, page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <DataTableToolbar title={title} numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="medium">
            <DataTableHead
              numSelected={selected.length}
              rowCount={rows.length}
              {...{ headCells, order, orderBy, onSelectAll, onSort }}
            />
            <TableBody>
              {visibleRows.map((row, i) => {
                const isSelected = isRowSelected(row.id);
                const labelId = `${title.toLowerCase().replace(/ /g, "-")}-table-checkbox-${i}`;

                return (
                  <TableRow
                    hover
                    onClick={e => onRowClick(e, row.id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    selected={isSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isSelected} />
                    </TableCell>
                    {headCells.map(cell => (
                      <TableCell
                        key={cell.id}
                        component={cell.primary ? "th" : "td"}
                        id={cell.primary ? labelId : null}
                        // scope={cell.primary ? "row" : null}
                        align={cell.numeric ? "right" : "left"}
                        padding={cell.disablePadding ? "none" : "normal"}
                      >
                        {row[cell.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {
                emptyRows > 0 &&
                <TableRow style={{ height: 73 * emptyRows }}>
                  <TableCell colSpan={headCells.length} />
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          {...{ rowsPerPage, page, onPageChange, onRowsPerPageChange }}
        />
      </Paper>
    </Box>
  );
});