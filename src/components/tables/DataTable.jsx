import { Box, Checkbox, Collapse, Paper, Slide, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Tooltip } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import DataTableToolbar from "./DataTableToolbar";
import DataTableHead from "./DataTableHead";

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

  const onSort = useCallback((_, prop) => {
    if (orderBy == prop) {
      setOrder(order == "asc" ? "desc" : "asc");
    } else {
      setOrderBy(prop);
    }
  }, [order, setOrder, orderBy, setOrderBy]);

  const onSelectAll = useCallback(e => {
    if (e.target.checked && e.target.getAttribute("data-indeterminate") != "true") {
      setSelected(rows.filter(({ selectable }) => selectable).map(n => n.id));
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

  const onPageChange = useCallback((_, newPage) => setPage(newPage + 1), [setPage]);

  const onRowsPerPageChange = useCallback(e => setRowsPerPage(Number(e.target.value)), [setRowsPerPage]);

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

  useEffect(() => {
    if (selected.length) {
      setSelected([]);
    }
  }, [rows]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table size="medium">
            <DataTableHead
              numSelected={selected.length}
              rowCount={rows.length}
              {...{ columns, order, orderBy, onSelectAll, onSort, multiActions }}
            />
            <TableBody>
              {visibleRows.map(row => {
                const isSelected = isRowSelected(row.id);
                // const labelId = `${title.toLowerCase().replace(/ /g, "-")}-table-checkbox-${i}`;

                return (
                  <TableRow
                    hover={row.selectable}
                    onClick={e => row.selectable && onRowClick(e, row.id)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    selected={isSelected}
                    sx={{ cursor: row.selectable ? "pointer" : "" }}
                  >
                    {
                      multiActions &&
                      <TableCell padding="checkbox">
                        {row.selectable && <Checkbox color="primary" checked={isSelected} />}
                        {
                          !row.selectable &&
                          <Tooltip title="Can't select row">
                            <Box display="inline-flex">
                              <Checkbox color="primary" disabled />
                            </Box>
                          </Tooltip>
                        }
                      </TableCell>
                    }
                    {columns.map(cell => (
                      <TableCell
                        key={cell.id}
                        component={cell.primary ? "th" : "td"}
                        // id={cell.primary ? labelId : null}
                        // scope={cell.primary ? "row" : null}
                        align={cell.align || (cell.numeric ? "right" : "left")}
                        padding={cell.disablePadding ? "none" : "normal"}
                      >
                        {row[cell.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
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
    </Box>
  );
}