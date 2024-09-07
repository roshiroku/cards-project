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
  const [defaultValue] = useState(new UserModel().toObject());
  const [initialValue, setInitialValue] = useState();
  const schema = useMemo(() => new LoginSchema(), []);
  const { user, login, banTime } = useAuthentication();
  const bannedUntil = useMemo(() => new Date(Date.now() + banTime), [banTime]);
  const { setNotification } = usePageUI();
  const navigate = useNavigate();

  const onCancel = useCallback(() => navigate(ROUTES.root), []);

  const onSubmit = useLoadCallback(async ({ email, password }) => {
    setInitialValue({ email, password });
    await login(email, password);
    setNotification({ message: "Logged in", severity: "success" });
  }, []);

  return (
    <PageContent>
      {user && <Navigate to={ROUTES.root} replace />}
      {
        Boolean(banTime) &&
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
        </Box>
      }
      {
        !user && !banTime &&
        <Box maxWidth="sm" m="auto" py={2}>
          <SchemaForm title="login" {...{ initialValue, defaultValue, schema, onCancel, onSubmit }} />
        </Box>
      }
    </PageContent>
  );
}