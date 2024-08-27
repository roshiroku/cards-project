import { CardActionArea, Container, Grid, CardHeader as MUICardHeader, CardActions as MUICardActions } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'
import Card, { CardBody, CardHeader } from '../../components/cards/Card'
import { Card as MUICard } from "@mui/material";

import SchemaForm from '../../components/forms/SchemaForm';
import { useNavigate } from 'react-router-dom';
import CardModel from '../../models/CardModel';
import CardSchema from '../../schema/CardSchema';
import { ROUTES } from '../../Router';

export default function AddCardPage() {
  const defaultValue = useMemo(() => new CardModel().toObject(), []);
  const schema = useMemo(() => new CardSchema(), []);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(defaultValue);

  // Right now im having an issue with passing the props to the Card. 1. Its not working 2. for some reason Address and Img keep coming up with errors or undefined. Also the Card side of the page looks very weird right now, but that's the least important thing for the moment. 

  const onCancel = useCallback(() => navigate(ROUTES.root), []);
  const onSubmit = useCallback(data => {
    CardModel.fromObject(data).save().then(({ _id }) => navigate(`${ROUTES.cardInfo}/${_id}`));
  }, []);

  return (
    <Container maxWidth="md" sx={{ my: 3 }}>
      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12} md={8}>
          {/* Bring the card form here */}
          <SchemaForm title="Create Card" {...{ defaultValue, schema, onCancel, onSubmit }} onChange={setPreview} />
        </Grid>

        {/* Brind card display here */}
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
  )
};

