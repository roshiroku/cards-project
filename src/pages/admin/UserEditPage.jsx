import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useLoadCallback, useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";
import EditUserSchema from "../../schema/EditUserSchema";
import UserModel from "../../models/UserModel";

export default function UserEditPage() {
  const { user: identity } = useAuthentication();
  const [user, setUser] = useState();
  const defaultValue = useMemo(() => user?.toObject(), [user]);
  const [initialValue, setInitialValue] = useState();
  const schema = useMemo(() => new EditUserSchema(), []);
  const { setNotification } = usePageUI();
  const { id } = useParams();
  const navigate = useNavigate();

  const onCancel = useCallback(() => navigate(ROUTES.root), []);

  const onSubmit = useLoadCallback(async data => {
    setInitialValue(data);
    const fallback = user.serialize();
    await user.fromObject(data).save(fallback);
    setNotification({ message: "User updated", severity: "success" });
  }, [user]);

  useLoadEffect(async () => {
    setUser(await UserModel.load(id));
  }, [id]);

  return (
    <PageContent>
      {identity?.isAdmin && user && <SchemaForm title="edit user" {...{ initialValue, defaultValue, schema, onCancel, onSubmit }} />}
      {(!identity?.isAdmin || !user) && <Navigate to={ROUTES.root} replace />}
    </PageContent>
  );
}