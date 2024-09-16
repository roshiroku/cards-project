import UserModel from "../../models/UserModel";
import { useCallback, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import { Box, Container, Typography } from "@mui/material";
import LoginSchema from "../../schema/LoginSchema";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useLoadCallback, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";
import { ErrorOutline } from "@mui/icons-material";
import ErrorInfo from "../../components/layout/ErrorInfo";

export default function LoginPage() {
  const [initialValue, setInitialValue] = useState();
  const defaultValue = useMemo(() => new UserModel().toObject(), []);
  const schema = useMemo(() => new LoginSchema(), []);
  const { user, login, banTime } = useAuthentication();
  const bannedUntil = useMemo(() => new Date(Date.now() + banTime), [banTime]);
  const { setNotificationMessage } = usePageUI();
  const navigate = useNavigate();

  const onCancel = useCallback(() => navigate(ROUTES.root), []);

  const onSubmit = useLoadCallback(async ({ email, password }) => {
    setInitialValue({ email, password });
    await login(email, password);
    setNotificationMessage("Logged in");
  }, []);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: "center" }}>
        Login
      </Typography>
      <PageContent>
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
      </PageContent>
    </Container>
  );
}