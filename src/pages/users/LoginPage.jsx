import UserModel from "../../models/UserModel";
import { useCallback, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import { Box, Typography } from "@mui/material";
import LoginSchema from "../../schema/LoginSchema";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useLoadCallback, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";
import { ErrorOutline } from "@mui/icons-material";

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
    <PageContent>
      {
        user ?
          <Navigate to={ROUTES.root} replace /> :
          banTime ?
            <Box>
              <Typography variant="h3" color="error" gutterBottom>
                <ErrorOutline fontSize="inherit" />
              </Typography>
              <Typography variant="body1" paragraph>
                Too many login attempts detected.
              </Typography>
              <Typography variant="body1" paragraph>
                Try again on {bannedUntil.toLocaleString()}.
              </Typography>
            </Box> :
            <Box maxWidth="sm" m="auto" py={2}>
              <SchemaForm title="login" {...{ initialValue, defaultValue, schema, onCancel, onSubmit }} />
            </Box>
      }
    </PageContent>
  );
}