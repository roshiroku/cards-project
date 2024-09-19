import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        const { value } = inputRef.current;
        inputRef.current.setSelectionRange(value.length, value.length);
      }
    });
  }, [showPassword]);

  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      inputRef={inputRef}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(show => !show)}
              onMouseDown={e => e.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}
