import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material"
import { useCallback, useMemo, useState } from "react"
import { CardBody, CardHeader } from "../../components/cards/Card"
import { Card as MUICard } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CardModel from "../../models/CardModel";
import CardSchema from "../../schema/CardSchema";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useLoadCallback, useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import ContentLoader from "../../components/layout/ContentLoader";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function CardFormPage() {
  const [card, setCard] = useState();
  const [initialValue, setInitialValue] = useState();
  const [preview, setPreview] = useState({});

  const schema = useMemo(() => new CardSchema(), []);
  const defaultValue = useMemo(() => card?.toObject(), [card]);

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthentication();
  const { setNotificationMessage } = usePageUI();
  const md = useMediaQuery(theme => theme.breakpoints.down("md"));

  const onCancel = useCallback(() => navigate(ROUTES.root), []);

  const onSubmit = useLoadCallback(async data => {
    setInitialValue(data);
    const fallback = card.serialize();
    await card.fromObject(data).save(fallback);
    !id && user?.cards?.push(card);
    navigate(`${ROUTES.cardInfo}/${card._id}`);
    setNotificationMessage(`Business card ${id ? "updated" : "created"} successfully.`);
  }, [id, user, card]);

  useDocumentTitle(`LeCard - ${id ? "Edit" : "Create"} Business Card`);

  useLoadEffect(async () => {
    const card = id ? await CardModel.load(id) : new CardModel();
    setCard(card);
    setPreview(card.toObject());
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? "Edit" : "Create"} Card
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {id ? "Update" : "Create"} your business card {id && "information "}and manage its preferences below.
        </Typography>
      </Box>
      <ContentLoader>
        {card ? (
          user?.isBusiness && (!id || user._id == card.user_id) ? (
            <Grid container spacing={4} alignItems="stretch">
              <Grid item xs={12} md={8}>
                <SchemaForm
                  {...{ initialValue, defaultValue, schema, onCancel, onSubmit }}
                  onChange={setPreview}
                />
              </Grid>
              {!md && (
                <Grid item xs={12} md={4}>
                  <MUICard sx={{ display: "flex", flexDirection: "column" }}>
                    <CardHeader
                      title={preview.title || "Title"}
                      subtitle={preview.subtitle || "Subtitle"}
                      image={{ url: preview.imageUrl, alt: preview.imageAlt }}
                    />
                    <CardBody
                      phone={preview.phone}
                      address={preview}
                      bizNumber={preview.bizNumber || "N/A"}
                    />
                  </MUICard>
                </Grid>
              )}
            </Grid>
          ) : (
            <Navigate to={ROUTES.root} replace />
          )) : (
          <Navigate to={ROUTES.error + "/404"} replace />
        )}
      </ContentLoader>
    </Container>
  );
}
