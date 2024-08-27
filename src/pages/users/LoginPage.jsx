import UserModel from "../../models/UserModel";
import { useCallback, useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import { Box } from "@mui/material";
import LoginSchema from "../../schema/LoginSchema";
import { useAuthentication } from "../../providers/AuthenticationProvider";

export default function LoginPage() {
  const defaultValue = useMemo(() => new UserModel().toObject(), []);
  const schema = useMemo(() => new LoginSchema(), []);
  const { user, login } = useAuthentication();
  const navigate = useNavigate();
  const onCancel = useCallback(() => navigate(ROUTES.root), []);
  const onSubmit = useCallback(({ email, password }) => {
    login(email, password).then(() => navigate(ROUTES.root));
  }, []);

  return (
    user ?
      <Navigate to={ROUTES.root} /> :
      <Box maxWidth="sm" m="auto" py={2}>
        <SchemaForm title="login" {...{ defaultValue, schema, onCancel, onSubmit }} />
      </Box>
  );
}