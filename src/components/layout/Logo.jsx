import { Paper, Typography } from "@mui/material";

export default function Logo({ color = "primary.main", variant = "h4", ...props }) {
  return (
    <Typography variant={variant} color="white" {...props}>
      Le
      <Paper elevation={0} component="span" sx={{
        display: "inline-block",
        position: "relative",
        bgcolor: "white",
        textTransform: "uppercase",
        color,
        fontWeight: 600,
        px: 0.5,
        ml: 0.5
      }}>
        Card
      </Paper>
    </Typography>
  );
}