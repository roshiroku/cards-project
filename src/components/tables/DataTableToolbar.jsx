import { Delete, FilterList } from "@mui/icons-material";
import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { memo } from "react";

export default memo(function DataTableToolbar({ title, numSelected }) {
  return (
    <Toolbar
      sx={[
        { pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
        numSelected > 0 && {
          bgcolor: ({ palette }) => alpha(palette.primary.main, palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton children={<Delete />} />
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton children={<FilterList />} />
        </Tooltip>
      )}
    </Toolbar>
  );
});