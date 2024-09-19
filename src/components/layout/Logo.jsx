import { Paper, ThemeProvider, Typography } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";

export default function Logo({ color = "primary.main", variant = "h4", ...props }) {
  const { lightTheme } = useTheme();

  return (
    <Typography variant={variant} color="white" {...props}>
      Le
      <ThemeProvider theme={lightTheme}>
        <Paper
          elevation={0}
          component="span"
          sx={{
            display: "inline-block",
            position: "relative",
            bgcolor: "white",
            textTransform: "uppercase",
            color,
            fontWeight: 600,
            px: 0.5,
            ml: 0.5
          }}
        >
          Card
        </Paper>
      </ThemeProvider>
    </Typography>
  );
}