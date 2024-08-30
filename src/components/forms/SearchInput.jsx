import { InputAdornment, TextField } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";
import { Search } from "@mui/icons-material";

export default function SearchInput({ defaultValue, onChange }) {
  const { theme } = useTheme();

  return (
    <TextField
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: "5px",
        "& .MuiInputBase-root": {
          height: "40px",
          padding: "0 8px 0 0",
        },
        "& .MuiInputLabel-root": {
          color: theme.palette.text.primary,
        },
      }}
      placeholder="Search cards"
      defaultValue={defaultValue}
      onChange={e => onChange(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
}