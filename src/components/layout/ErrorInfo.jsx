import { useTheme } from "@emotion/react";
import { ErrorOutline } from "@mui/icons-material";
import { Box, CardMedia, Typography } from "@mui/material";
import LinkButton from "../content/LinkButton";
import { ROUTES } from "../../Router";
import imageUrl from "../../assets/errorImage.png";

export default function ErrorInfo({ status, message = "An unexpected error has occurred. Please try again later.", children }) {
  const { isDarkMode } = useTheme();

  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        <ErrorOutline sx={{ fontSize: 80, color: "error.main" }} />
        <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 2 }}>
          {status && `Error ${status}`}
        </Typography>
        {children || (
          <Typography variant="h6" color="textSecondary">
            {message}
          </Typography>
        )}
      </Box>

      <Box display="flex" justifyContent="center">
        <CardMedia
          component="img"
          src={imageUrl}
          alt={`Error ${status}`}
          sx={{
            width: "auto",
            filter: isDarkMode ? "invert(1)" : ""
          }}
        />
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <LinkButton variant="contained" color="primary" to={ROUTES.root} size="large">
          Go to Homepage
        </LinkButton>
      </Box>
    </Box >
  );
}
