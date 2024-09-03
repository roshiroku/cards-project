import UserModel from "../../models/UserModel";
import { useCallback, useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import { Box } from "@mui/material";
import LoginSchema from "../../schema/LoginSchema";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useLoadCallback } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";

export default function LoginPage() {
  const [defaultValue, setDefaultValue] = useState(new UserModel().toObject());
  const schema = useMemo(() => new LoginSchema(), []);
  const { user, login } = useAuthentication();
  const navigate = useNavigate();
  const onCancel = useCallback(() => navigate(ROUTES.root), []);
  const onSubmit = useLoadCallback(async ({ email, password }) => {
    setDefaultValue({ email, password });
    await login(email, password);
  }, []);

  return (
    <PageContent>
      {user && <Navigate to={ROUTES.root} replace />}
      {
        !user &&
        <Box maxWidth="sm" m="auto" py={2}>
          <SchemaForm title="login" {...{ defaultValue, schema, onCancel, onSubmit }} />
        </Box>
      }
    </PageContent>
  );
}