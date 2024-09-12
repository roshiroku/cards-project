import { InputAdornment, TextField } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";
import { Search } from "@mui/icons-material";

export default function SearchInput({ value, onChange }) {
  const { theme } = useTheme();

  return (
    <TextField
      placeholder="Search"
      value={value}
      onChange={e => onChange(e.target.value)}
      InputProps={{
        endAdornment:
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
      }}
      fullWidth
      size="small"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: "5px",
      }}
    />
  );
}