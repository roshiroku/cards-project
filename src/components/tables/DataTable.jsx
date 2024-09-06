import { Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material";
import { memo, useCallback, useMemo, useState } from "react";
import DataTableToolbar from "./DataTableToolbar";
import DataTableHead from "./DataTableHead";

export default memo(function DataTable({
  title,
  rows,
  columns,
  page,
  setPage,
  perPage: rowsPerPage = 5,
  setPerPage: setRowsPerPage
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState();
  const [selected, setSelected] = useState([]);

  const sort = useMemo(() => columns.find(({ id }) => id == orderBy)?.sort, [orderBy]);

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

  const onPageChange = useCallback((_, newPage) => setPage(newPage + 1), []);

  const onRowsPerPageChange = useCallback(e => setRowsPerPage(Number(e.target.value)), []);

  const isRowSelected = useCallback(id => selected.includes(id), [selected]);

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


  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = useMemo(() => {
  //   return page > 1 ? Math.max(0, rowsPerPage - visibleRows.length) : 0;
  // }, [page, rowsPerPage, visibleRows]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <DataTableToolbar title={title} numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="medium">
            <DataTableHead
              numSelected={selected.length}
              rowCount={rows.length}
              {...{ columns, order, orderBy, onSelectAll, onSort }}
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
                    {columns.map(cell => (
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
              {/*
                emptyRows > 0 &&
                <TableRow style={{ height: 73 * emptyRows }}>
                  <TableCell colSpan={columns.length} />
                </TableRow>
              */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          page={page - 1}
          showFirstButton
          showLastButton
          {...{ rowsPerPage, onPageChange, onRowsPerPageChange }}
        />
      </Paper>
    </Box>
  );
});