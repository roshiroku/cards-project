import { Delete, FilterList, FilterListOff } from "@mui/icons-material";
import { alpha, IconButton, Menu, Toolbar, Tooltip, Typography } from "@mui/material";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import SearchInput from "../forms/SearchInput";
import { useSearch } from "../../providers/SearchProvider";
import { ROUTES } from "../../Router";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../providers/ThemeProvider";

export default memo(function DataTableToolbar({ title, selected, multiActions }) {
  const numSelected = useMemo(() => selected.length, [selected]);
  const { theme } = useTheme();

  const selectedColor = useMemo(() => {
    return alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity);
  }, [theme]);

  return (
    <Toolbar
      sx={[
        { pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
        numSelected > 0 && { bgcolor: selectedColor },
      ]}
    >
      {
        numSelected > 0 ?
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography> :
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
      }
      {numSelected > 0 && multiActions && multiActions(selected)}
    </Toolbar>
  );
});