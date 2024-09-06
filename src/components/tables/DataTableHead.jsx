import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { memo } from "react";

export default memo(function DataTableHead({
  onSelectAll,
  order,
  orderBy,
  numSelected,
  rowCount,
  onSort,
  headCells
}) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected == rowCount}
            onChange={onSelectAll}
          />
        </TableCell>
        {headCells.map(cell => (
          <TableCell
            key={cell.id}
            align={cell.numeric ? "right" : "left"}
            padding={cell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy == cell.id ? order : false}
          >
            {cell.sort ?
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
              </TableSortLabel> :
              cell.label
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
});