import UserModel from "../../models/UserModel";
import { useCallback, useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import RegisterSchema from "../../schema/RegisterSchema";
import { useAuthentication } from "../../providers/AuthenticationProvider";

export default function RegisterPage() {
  const defaultValue = useMemo(() => new UserModel().toObject(), []);
  const schema = useMemo(() => new RegisterSchema(), []);
  const { user, login } = useAuthentication();
  const navigate = useNavigate();
  const onCancel = useCallback(() => navigate(ROUTES.root), []);
  const onSubmit = useCallback(async data => {
    const user = await UserModel.fromObject(data).save();
    login(user.email, user.password);
  }, []);

  return (
    user ?
      <Navigate to={ROUTES.root} /> :
      <SchemaForm title="register" {...{ defaultValue, schema, onCancel, onSubmit }} />
  );
}