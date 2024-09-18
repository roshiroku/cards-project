import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { forwardRef } from "react";

export default forwardRef(function SearchInput({ value, onChange, sx = {} }, ref) {
  return (
    <TextField
      placeholder="Search"
      value={value}
      onChange={e => onChange(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        )
      }}
      fullWidth
      size="small"
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 1,
        ...sx,
      }}
      inputRef={ref}
    />
  );
});