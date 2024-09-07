import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useLoadCallback, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";
import EditUserSchema from "../../schema/EditUserSchema";

export default function UserProfilePage() {
  const { user } = useAuthentication();
  const defaultValue = useMemo(() => user?.toObject(), [user]);
  const [initialValue, setInitialValue] = useState();
  const schema = useMemo(() => new EditUserSchema(), []);
  const { setNotification } = usePageUI();
  const navigate = useNavigate();

  const onCancel = useCallback(() => navigate(ROUTES.root), []);

  const onSubmit = useLoadCallback(async data => {
    setInitialValue(data);
    const fallback = user.serialize();
    await user.fromObject(data).save(fallback);
    setNotification({ message: "Profile updated", severity: "success" });
  }, [user]);

  return (
    <PageContent>
      {user && <SchemaForm title="edit profile" {...{ initialValue, defaultValue, schema, onCancel, onSubmit }} />}
      {!user && <Navigate to={ROUTES.root} replace />}
    </PageContent>
  );
}