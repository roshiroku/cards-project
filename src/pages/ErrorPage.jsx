import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { useMemo } from "react";
import ErrorInfo from "../components/layout/ErrorInfo";
import useDocumentTitle from "../hooks/useDocumentTitle";

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
};

const defaultMessage = "An unexpected error has occurred. Please try again later.";

export default function ErrorPage({ status: defaultStatus }) {
  const { status = defaultStatus } = useParams();

  const title = useMemo(() => "LeCard - " + (statusMessages[Number(status)]?.split(":")[0] || "Error"), [status]);
  const message = useMemo(() => statusMessages[Number(status)] || defaultMessage, [status]);

  useDocumentTitle(title);

  return (
    <Container sx={{ py: 6 }}>
      <ErrorInfo {...{ message, status }} />
    </Container>
  );
}
