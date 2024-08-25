import UserModel from "../../models/UserModel";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import { Box } from "@mui/material";
import LoginSchema from "../../schema/LoginSchema";

export default function LoginPage() {
  const defaultValue = useMemo(() => new UserModel().toObject(), []);
  const schema = useMemo(() => new LoginSchema(), []);
  const navigate = useNavigate();
  const onCancel = useCallback(() => navigate(ROUTES.root), []);
  const onSubmit = useCallback(_ => { }, []);

  return (
    <Box maxWidth="sm" m="auto" py={2}>
      <SchemaForm title="login" {...{ defaultValue, schema, onCancel, onSubmit }} />
    </Box>
  );
}