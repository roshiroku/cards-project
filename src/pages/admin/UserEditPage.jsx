import { useCallback, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useLoadCallback, useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import ContentLoader from "../../components/layout/ContentLoader";
import EditUserSchema from "../../schema/EditUserSchema";
import UserModel from "../../models/UserModel";
import { Container, Typography } from "@mui/material";

export default function UserEditPage() {
  const [user, setUser] = useState();
  const [initialValue, setInitialValue] = useState();

  const defaultValue = useMemo(() => user?.toObject(), [user]);
  const schema = useMemo(() => new EditUserSchema(), []);

  const navigate = useNavigate();
  const { id } = useParams();
  const { user: identity, setIsLoggingIn } = useAuthentication();
  const { setNotificationMessage } = usePageUI();

  const onCancel = useCallback(() => navigate(ROUTES.root), []);

  const onSubmit = useLoadCallback(async data => {
    try {
      setIsLoggingIn(user._id == identity._id);
      setInitialValue(data);
      const fallback = user.serialize();
      await user.fromObject(data).save(fallback);
    } finally {
      setIsLoggingIn(false);
    }

    setNotificationMessage("User profile has been successfully updated.");
  }, [user, identity]);

  useLoadEffect(async () => setUser(await UserModel.load(id)), [id]);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: "center" }}>
        Edit User
      </Typography>
      <ContentLoader>
        {identity?.isAdmin ? (
          user ? (
            <SchemaForm {...{ initialValue, defaultValue, schema, onCancel, onSubmit }} />
          ) : (
            <Navigate to={ROUTES.error + "/404"} replace />
          )) : (
          <Navigate to={ROUTES.root} replace />
        )}
      </ContentLoader>
    </Container>
  );
}
