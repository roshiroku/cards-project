import { Container, Grid, Typography } from "@mui/material"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { CardBody, CardHeader } from "../../components/cards/Card"
import { Card as MUICard } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CardModel from "../../models/CardModel";
import CardSchema from "../../schema/CardSchema";
import { ROUTES } from "../../Router";
import SchemaForm from "../../components/forms/SchemaForm";

export default function CardFormPage() {
  const [card, setCard] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [defaultValue, setDefaultValue] = useState();
  const [preview, setPreview] = useState();
  const schema = useMemo(() => new CardSchema(), []);
  const { id } = useParams();
  const navigate = useNavigate();

  const onCardLoaded = useCallback(card => {
    const data = card.toObject();
    setCard(card);
    setDefaultValue(data);
    setPreview(data);
    setIsLoading(false);
  }, []);

  const onCancel = useCallback(() => navigate(ROUTES.root), []);

  const onSubmit = useCallback(data => {
    card.fromObject({ _id: id, ...data }).save()
      .then(({ _id }) => navigate(`${ROUTES.cardInfo}/${_id}`));
  }, [id, card]);

  useEffect(() => {
    setIsLoading(true);

    if (id) {
      CardModel.load(id).then(onCardLoaded);
    } else {
      onCardLoaded(new CardModel());
    }
  }, [id]);

  return (
    !isLoading &&
    <Container maxWidth="md" sx={{ my: 3 }}>
      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12} md={8}>
          <SchemaForm
            title="Create Card"
            {...{ defaultValue, schema, onCancel, onSubmit }}
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
    </Container>
  );
};