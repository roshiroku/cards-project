import { Call, Delete, Edit, Favorite } from "@mui/icons-material";
import { CardActionArea, CardMedia, CardHeader as MUICardHeader, Divider, CardContent, Typography, Card as MUICard, CardActions as MUICardActions, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import { useCallback, useMemo, useState } from "react";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import EllipsisText from "../content/EllipsisText";
import CardModel from "../../models/CardModel";

export default function Card({ id, ownerId, title, subtitle, phone, image, address, bizNumber, onChange, likes }) {
  const navigate = useNavigate();

  return (
    <MUICard sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardActionArea
        onClick={() => navigate(`${ROUTES.cardInfo}/${id}`)}
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "stretch" }}
      >
        <CardHeader {...{ title, subtitle, image }} />
        <CardBody {...{ phone, address, bizNumber }} />
      </CardActionArea>
      <CardActions {...{ id, ownerId, onChange, likes }} />
    </MUICard>
  );
}

export function CardHeader({ title, subtitle, image }) {
  const defaultImage = "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg";
  const imageUrl = useMemo(() => typeof image == "object" ? image.url : image, [image]);
  const imageAlt = useMemo(() => typeof image == "object" ? image.alt : title, [image, title]);

  return (
    <>
      <CardMedia sx={{ aspectRatio: 2 }} image={imageUrl || defaultImage} alt={imageAlt} />
      <MUICardHeader
        title={<EllipsisText>{title}</EllipsisText>}
        subheader={<EllipsisText>{subtitle}</EllipsisText>}
        sx={{ "& .MuiCardHeader-content": { maxWidth: "100%" } }}
      />
      <Divider variant="middle" />
    </>
  );
}

export function CardBody({ phone, address, bizNumber }) {
  const addressStr = useMemo(() =>
    typeof address == "object" ? [
      address.country,
      address.city,
      address.street,
      address.houseNumber
    ].filter(word => word).join(" ") : address,
    [address]);

  return (
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        <strong>Phone:</strong> {phone}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <strong>Address:</strong> {addressStr}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <strong>Card Number:</strong> {bizNumber}
      </Typography>
    </CardContent>
  );
}

export function CardActions({ id, ownerId, onChange, likes }) {
  const { user } = useAuthentication();
  const [isFav, setIsFav] = useState(likes.includes(user._id));
  const navigate = useNavigate();

  const handleDelete = useCallback(async () => {
    if (confirm("Are you sure you want to remove card?")) {
      const card = await CardModel.load(id);
      await card.delete();
      onChange && onChange();
    }
  }, [onChange]);

  const toggleFav = useCallback(async () => {
    const card = await CardModel.load(id);
    card.toggleLike(user._id).then(() => setIsFav(card.likes.includes(user._id)));
    setIsFav(card.likes.includes(user._id));
  }, [id, user]);

  return (
    <MUICardActions sx={{ justifyContent: "space-between" }}>
      <Box display="flex">
        {
          user?._id == ownerId &&
          <>
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
            <IconButton onClick={() => navigate(`${ROUTES.editCard}/${id}`)}>
              <Edit />
            </IconButton>
          </>
        }
      </Box>
      <Box display="flex">
        <IconButton>
          <Call />
        </IconButton>
        {
          user &&
          <IconButton onClick={toggleFav} >
            <Favorite sx={{ color: isFav ? "red" : "gray" }} />
          </IconButton>
        }
      </Box>
    </MUICardActions>
  );
}