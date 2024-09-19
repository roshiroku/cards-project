import UserModel from "../../models/UserModel";
import { useCallback, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import { Box, Container, Typography } from "@mui/material";
import LoginSchema from "../../schema/LoginSchema";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useLoadCallback, usePageUI } from "../../providers/PageUIProvider";
import ContentLoader from "../../components/layout/ContentLoader";
import ErrorInfo from "../../components/layout/ErrorInfo";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function LoginPage() {
  const [initialValue, setInitialValue] = useState();

  const defaultValue = useMemo(() => new UserModel().toObject(), []);
  const schema = useMemo(() => new LoginSchema(), []);

  const navigate = useNavigate();
  const { setNotificationMessage } = usePageUI();
  const { user, login, banTime } = useAuthentication();

  const bannedUntil = useMemo(() => new Date(Date.now() + banTime), [banTime]);

  const onCancel = useCallback(() => navigate(ROUTES.root), []);

  const onSubmit = useLoadCallback(async ({ email, password }) => {
    setInitialValue({ email, password });
    await login(email, password);
    setNotificationMessage("You have successfully logged in.");
  }, []);

  useDocumentTitle("LeCard - Login");

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: "center" }}>
        Login
      </Typography>
      <ContentLoader>
        {user ? (
          <Navigate to={ROUTES.root} replace />
        ) : (
          banTime ? (
            <ErrorInfo>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Too many login attempts detected.
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Try again on {bannedUntil.toLocaleString()}.
              </Typography>
            </ErrorInfo>
          ) : (
            <Box maxWidth="sm" mx="auto">
              <SchemaForm
                {...{ initialValue, defaultValue, schema, onCancel, onSubmit }}
                structure={{ email: 12, password: 12 }}
              />
            </Box>
          ))}
      </ContentLoader>
    </Container>
  );
}
