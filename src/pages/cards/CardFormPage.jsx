import { CardActionArea, Container, Grid, CardHeader as MUICardHeader, CardActions as MUICardActions } from "@mui/material"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import Card, { CardBody, CardHeader } from "../../components/cards/Card"
import { Card as MUICard } from "@mui/material";
import SchemaForm from "../../components/forms/SchemaForm";
import { useNavigate, useParams } from "react-router-dom";
import CardModel from "../../models/CardModel";
import CardSchema from "../../schema/CardSchema";
import { ROUTES } from "../../Router";

export default function CardFormPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [defaultValue, setDefaultValue] = useState();
  const [preview, setPreview] = useState();
  const schema = useMemo(() => new CardSchema(), []);
  const { id } = useParams();
  const navigate = useNavigate();

  const onCardLoaded = useCallback(card => {
    const data = card.toObject();
    setDefaultValue(data);
    setPreview(data);
    setIsLoading(false);
  }, []);

  const onCancel = useCallback(() => navigate(ROUTES.root), []);

  const onSubmit = useCallback(data => {
    CardModel.fromObject({ _id: id, ...data }).save()
      .then(({ _id }) => navigate(`${ROUTES.cardInfo}/${_id}`));
  }, []);

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
          <MUICard sx={{ display: "flex", flexDirection: "column", }}>
            <CardHeader
              title={preview.title || "Default Title"}
              subtitle={preview.subtitle || "Default Subtitle"}
              image={preview.imageUrl}
            />
            <CardBody
              phone={preview.phone}
              address={preview}
              bizNumber={preview.bizNumber}
            />
          </MUICard>
        </Grid>
      </Grid>
    </Container>
  );
};