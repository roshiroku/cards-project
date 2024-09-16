import UserModel from "../../models/UserModel";
import { useCallback, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import RegisterSchema from "../../schema/RegisterSchema";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useLoadCallback, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";
import { Container, Typography } from "@mui/material";

export default function RegisterPage() {
  const defaultValue = useMemo(() => new UserModel().toObject(), []);
  const [initialValue, setInitialValue] = useState();
  const schema = useMemo(() => new RegisterSchema(), []);
  const { user, login } = useAuthentication();
  const { setNotificationMessage } = usePageUI();
  const navigate = useNavigate();

  const onCancel = useCallback(() => navigate(ROUTES.root), []);

  const onSubmit = useLoadCallback(async data => {
    const user = new UserModel();
    setInitialValue(data);
    const fallback = user.serialize();
    await user.fromObject(data).save(fallback);
    setNotificationMessage("Registration completed");
    await login(user.email, user.password);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: "center" }}>
        Signup
      </Typography>
      <PageContent>
        {user ? (
          <Navigate to={ROUTES.root} replace />
        ) : (
          <SchemaForm {...{ initialValue, defaultValue, schema, onCancel, onSubmit }} />
        )}
      </PageContent>
    </Container>
  );
}