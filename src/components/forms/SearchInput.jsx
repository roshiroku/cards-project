import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function SearchInput({ value, onChange, sx = {} }) {
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
        backgroundColor: "background.paper",
        borderRadius: 1,
        ...sx,
      }}
    />
  );
}