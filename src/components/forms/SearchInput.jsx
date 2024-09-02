import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";
import { Search } from "@mui/icons-material";

export default function SearchInput({ value, onSubmit, onChange }) {
  const { theme } = useTheme();

  return (
    <TextField
      placeholder="Search"
      value={value}
      onChange={e => onChange(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={onSubmit}
              onMouseDown={e => e.preventDefault()}
              edge="end"
            >
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: "5px",
        "& .MuiInputBase-root": {
          height: "40px",
        },
      }}
    />
  );
}