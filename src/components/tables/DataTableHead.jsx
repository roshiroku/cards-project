import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useCallback } from "react";

export default function DataTableHead({
  onSelectAll,
  order,
  setOrder,
  orderBy,
  setOrderBy,
  numSelected,
  rowCount,
  columns,
  checkbox
}) {
  const onSort = useCallback((_, prop) => {
    if (orderBy == prop) {
      setOrder(order == "asc" ? "desc" : "asc");
    } else {
      setOrderBy(prop);
    }
  }, [order, setOrder, orderBy, setOrderBy]);

  return (
    <TableHead>
      <TableRow>
        {checkbox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected == rowCount}
              onChange={onSelectAll}
            />
          </TableCell>
        )}
        {columns.map(cell => (
          <TableCell
            key={cell.id}
            align={cell.align || (cell.numeric ? "right" : "left")}
            padding={cell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy == cell.id ? order : false}
          >
            {cell.sort ? (
              <TableSortLabel
                active={orderBy == cell.id}
                direction={orderBy == cell.id ? order : "asc"}
                onClick={e => onSort(e, cell.id)}
              >
                {cell.label}
                {
                  orderBy == cell.id &&
                  <Box component="span" sx={visuallyHidden}>
                    {order == "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                }
              </TableSortLabel>
            ) : (
              cell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}