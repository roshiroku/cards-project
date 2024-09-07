import UserModel from "../../models/UserModel";
import { useCallback, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import RegisterSchema from "../../schema/RegisterSchema";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useLoadCallback, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";

export default function RegisterPage() {
  const defaultValue = useMemo(() => new UserModel().toObject(), []);
  const [initialValue, setInitialValue] = useState();
  const schema = useMemo(() => new RegisterSchema(), []);
  const { user, login } = useAuthentication();
  const { setNotification } = usePageUI();
  const navigate = useNavigate();

  const onCancel = useCallback(() => navigate(ROUTES.root), []);

  const onSubmit = useLoadCallback(async data => {
    const user = new UserModel();
    setInitialValue(data);
    await user.fromObject(data).save();
    setNotification({ message: "Registration completed", severity: "success" });
    await login(user.email, user.password);
  }, []);

  return (
    <PageContent>
      {user && <Navigate to={ROUTES.root} replace />}
      {!user && <SchemaForm title="register" {...{ initialValue, defaultValue, schema, onCancel, onSubmit }} />}
    </PageContent>
  );
}