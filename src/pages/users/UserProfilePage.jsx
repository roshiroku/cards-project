import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useLoadCallback } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";
import EditUserSchema from "../../schema/EditUserSchema";

export default function UserProfilePage() {
  const { user } = useAuthentication();
  const [defaultValue, setDefaultValue] = useState();
  const schema = useMemo(() => new EditUserSchema(), []);
  const navigate = useNavigate();
  const onCancel = useCallback(() => navigate(ROUTES.root), []);
  const onSubmit = useLoadCallback(async data => {
    setDefaultValue(data);
    await user.fromObject(data).save();
  }, [user]);

  useEffect(() => {
    setDefaultValue(user?.toObject());
  }, [user]);

  return (
    <PageContent>
      {defaultValue && <SchemaForm title="edit profile" {...{ defaultValue, schema, onCancel, onSubmit }} />}
      {!user && <Navigate to={ROUTES.root} replace />}
    </PageContent>
  );
}