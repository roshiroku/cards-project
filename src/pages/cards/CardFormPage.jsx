import { Container, Grid, Typography } from "@mui/material"
import React, { useCallback, useMemo, useState } from "react"
import { CardBody, CardHeader } from "../../components/cards/Card"
import { Card as MUICard } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CardModel from "../../models/CardModel";
import CardSchema from "../../schema/CardSchema";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useLoadCallback, useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";

export default function CardFormPage() {
  const [card, setCard] = useState();
  const [initialValue, setInitialValue] = useState();
  const [preview, setPreview] = useState();
  const schema = useMemo(() => new CardSchema(), []);
  const defaultValue = useMemo(() => card?.toObject(), [card]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthentication();
  const { setNotification } = usePageUI();

  const onCardLoaded = useCallback(card => {
    setCard(card);
    setPreview(card.toObject());
  }, []);

  const onCancel = useCallback(() => navigate(ROUTES.root), []);

  const onSubmit = useLoadCallback(async data => {
    setInitialValue(data);
    const fallback = card.serialize();
    await card.fromObject(data).save(fallback);
    !id && user?.cards?.push(card);
    navigate(`${ROUTES.cardInfo}/${card._id}`);
    setNotification({ message: `Card ${id ? "updated" : "created"}`, severity: "success" });
  }, [id, user, card]);

  useLoadEffect(async () => {
    onCardLoaded(id ? await CardModel.load(id) : new CardModel());
  }, [id]);

  return (
    <PageContent>
      {
        user?.isBusiness && (!id || user._id == card?.user_id) ?
          <Container maxWidth="md" sx={{ my: 3 }}>
            <Grid container spacing={4} alignItems="stretch">
              <Grid item xs={12} md={8}>
                <SchemaForm
                  title={`${id ? "Edit" : "Create"} Card`}
                  {...{ initialValue, defaultValue, schema, onCancel, onSubmit }}
                  onChange={setPreview}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography align="center" variant="h5" component="h1" margin={3}>
                  Card Preview
                </Typography>
                <MUICard sx={{ display: "flex", flexDirection: "column", }}>
                  <CardHeader
                    title={preview.title || "Title"}
                    subtitle={preview.subtitle || "Subtitle"}
                    image={preview.imageUrl}
                  />
                  <CardBody
                    phone={preview.phone}
                    address={preview}
                    bizNumber={preview.bizNumber}
                  />
                  <Typography marginTop={2} mx={2} fontWeight="bold">Description:</Typography>
                  <Typography mx={2} marginBottom={3}>{preview.description}</Typography>
                </MUICard>
              </Grid>
            </Grid>
          </Container> :
          <Navigate to={ROUTES.root} replace />
      }
    </PageContent>
  );
}