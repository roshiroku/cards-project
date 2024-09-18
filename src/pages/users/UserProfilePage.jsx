import { useCallback, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useLoadCallback, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";
import EditUserSchema from "../../schema/EditUserSchema";
import { Box, Container, Typography } from "@mui/material";

export default function UserProfilePage() {
  const [initialValue, setInitialValue] = useState();

  const { user, setIsLoggingIn } = useAuthentication();
  const { setNotificationMessage } = usePageUI();
  const navigate = useNavigate();

  const defaultValue = useMemo(() => user?.toObject(), [user]);

  const schema = useMemo(() => new EditUserSchema(), []);

  const onCancel = useCallback(() => navigate(ROUTES.root), []);

  const onSubmit = useLoadCallback(async data => {
    try {
      setIsLoggingIn(true);
      setInitialValue(data);
      const fallback = user.serialize();
      await user.fromObject(data).save(fallback);
    } finally {
      setIsLoggingIn(false);
    }
    
    setNotificationMessage("Profile updated");
  }, [user]);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Your Profile
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Update your account information and manage your preferences below.
        </Typography>
      </Box>
      <PageContent>
        {user ? (
          <SchemaForm {...{ initialValue, defaultValue, schema, onCancel, onSubmit }} />
        ) : (
          <Navigate to={ROUTES.root} replace />
        )}
      </PageContent>
    </Container>
  );
}