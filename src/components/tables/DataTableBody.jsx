import { Box, Checkbox, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { useCallback, useEffect } from "react";

export default function DataTableBody({ rows, columns, selected, setSelected, checkbox }) {
  const isRowSelected = useCallback(id => selected.includes(id), [selected]);

  const onRowClick = useCallback((_, id) => {
    const index = selected.indexOf(id);
    const newSelected = [...selected];

    if (index == -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(index, 1);
    }

    setSelected(newSelected);
  }, [selected, setSelected]);

  useEffect(() => {
    if (selected.length) {
      setSelected([]);
    }
  }, [rows]);

  return (
    <TableBody>
      {rows.map(row => {
        const isSelected = isRowSelected(row.id);

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
            {checkbox && (
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
            )}
            {columns.map(cell => (
              <TableCell
                key={cell.id}
                component={cell.primary ? "th" : "td"}
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
  );
}