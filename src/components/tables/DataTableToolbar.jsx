import { alpha, Box, Checkbox, lighten, Paper, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { forwardRef, useMemo } from "react";
import { useTheme } from "../../providers/ThemeProvider";

export default forwardRef(function DataTableToolbar({ selected, rowCount, onSelectAll, multiActions }, ref) {
  const { isDarkMode, darkTheme: theme } = useTheme();

  const numSelected = useMemo(() => selected.length, [selected]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        component={Paper}
        display="flex"
        position="fixed"
        left={theme.spacing(2)}
        right={theme.spacing(2)}
        bottom={theme.spacing(4)}
        zIndex={1}
        mx="auto"
        width="min-content"
        bgcolor={alpha(isDarkMode ? lighten(theme.palette.common.black, 0.05) : theme.palette.background.paper, 0.95)}
        elevation={0}
        ref={ref}
        sx={{ "& button": { color: "inherit" } }}
      >
        <Toolbar sx={{ position: "relative", p: 2, px: { xs: 1.5 } }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected == rowCount}
            onChange={onSelectAll}
          />
          <Typography sx={{ pl: 0.5, pr: 4 }} variant="subtitle1" noWrap>
            {numSelected} selected
          </Typography>
          {multiActions(selected)}
        </Toolbar>
      </Box>
    </ThemeProvider>
  );
});
