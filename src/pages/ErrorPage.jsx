import { useParams } from "react-router-dom";
import { Container, Box, Typography, CardMedia } from "@mui/material";
import { useTheme } from "../providers/ThemeProvider";
import { ErrorOutline } from "@mui/icons-material";
import imageUrl from "../assets/errorImage.png";
import { useMemo } from "react";
import LinkButton from "../components/content/LinkButton";
import { ROUTES } from "../Router";

const statusMessages = {
  400: "Bad Request: The server could not understand your request.",
  401: "Unauthorized: Please log in to access this page.",
  403: "Forbidden: You do not have permission to view this resource.",
  404: "Not Found: The page you are looking for does not exist.",
  405: "Method Not Allowed: The request method is not supported for this resource.",
  408: "Request Timeout: Your request took too long to complete. Please try again.",
  409: "Conflict: There was a conflict with your request. Please resolve the issue and try again.",
  410: "Gone: The resource you are looking for is no longer available.",
  422: "Unprocessable Entity: There were issues with your submission. Please check your input and try again.",
  429: "Too Many Requests: You have exceeded the allowed number of requests. Please wait and try again later.",
  500: "Internal Server Error: Something went wrong on our end.",
  503: "Service Unavailable: We're currently experiencing high traffic or performing maintenance. Please try again later.",
  504: "Gateway Timeout: The server did not receive a timely response from another server.",
  // Add more status codes and messages as needed
};

const defaultMessage = "An unexpected error has occurred. Please try again later.";

export default function ErrorPage() {
  const { isDarkMode } = useTheme();
  const { status } = useParams();

  // Determine the error message based on the status code
  const errorMessage = useMemo(() => statusMessages[Number(status)] || defaultMessage, [status]);

  return (
    <Container sx={{ py: 6 }}>
      <Box sx={{ textAlign: "center" }}>
        <ErrorOutline sx={{ fontSize: 80, color: "error.main" }} />
        <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 2 }}>
          {status ? `Error ${status}` : "Error"}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {errorMessage}
        </Typography>
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
          Go to Home
        </LinkButton>
      </Box>
    </Container>
  );
}
