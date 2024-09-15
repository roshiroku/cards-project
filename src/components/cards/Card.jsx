import { Call, Delete, Edit, Favorite } from "@mui/icons-material";
import { CardActionArea, CardMedia, CardHeader as MUICardHeader, Divider, CardContent, Typography, Card as MUICard, CardActions as MUICardActions, Box, IconButton, CircularProgress, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Router";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import EllipsisText from "../content/EllipsisText";
import CardModel from "../../models/CardModel";
import { useErrorCallback, usePageUI } from "../../providers/PageUIProvider";

const DEFAULT_CARD_IMAGE = "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg";

export default function Card({ id, ownerId, title, subtitle, phone, image, address, bizNumber, onChange, likes }) {
  return (
    <MUICard sx={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 395 }}>
      <CardActionArea
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "stretch" }}
        LinkComponent={Link}
        to={`${ROUTES.cardInfo}/${id}`}
      >
        <CardHeader {...{ title, subtitle, image }} />
        <CardBody {...{ phone, address, bizNumber }} />
      </CardActionArea>
      <CardActions {...{ id, ownerId, phone, likes, onChange }} />
    </MUICard>
  );
}

export function CardHeader({ title, subtitle, image }) {
  const imageUrl = useMemo(() => typeof image == "object" ? image.url : image, [image]);
  const imageAlt = useMemo(() => typeof image == "object" ? image.alt : title, [image, title]);

  return (
    <>
      <CardMedia sx={{ aspectRatio: 2 }} image={imageUrl || DEFAULT_CARD_IMAGE} alt={imageAlt} />
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

export function CardActions({ id, ownerId, phone, likes, onChange }) {
  const { user } = useAuthentication();
  const { setNotificationMessage } = usePageUI();
  const [isFav, setIsFav] = useState(likes.includes(user?._id));
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useErrorCallback(async () => {
    if (confirm("Are you sure you want to delete this card?")) {
      setIsDeleting(true);
      const card = await CardModel.load(id);
      await card.delete().finally(() => setIsDeleting(false));
      onChange && onChange();
      setNotificationMessage("Card deleted");
    }
  }, [onChange]);

  const toggleFav = useErrorCallback(async () => {
    const card = await CardModel.load(id);
    const update = () => setIsFav(card.isLikedBy(user)) || onChange && onChange();
    const likePromise = card.toggleLike(user);
    update();
    await likePromise.finally(update);
  }, [id, user]);

  useLayoutEffect(() => {
    setIsFav(user && likes.includes(user._id));
  }, [likes, user]);

  return (
    <MUICardActions sx={{ justifyContent: "space-between" }}>
      <Box display="flex">
        {
          (user?._id == ownerId || user?.isAdmin) &&
          <>
            <IconButton onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? <CircularProgress size={20} /> : <Delete />}
            </IconButton>
            <IconButton LinkComponent={Link} to={`${ROUTES.editCard}/${id}`} disabled={isDeleting}>
              <Edit />
            </IconButton>
          </>
        }
      </Box>
      <Box display="flex">
        <IconButton
          LinkComponent={Link}
          to={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`}
          target="_blank"
          disabled={isDeleting}
        >
          <Call />
        </IconButton>
        {
          user &&
          <Box display="flex" alignItems="center">
            <IconButton onClick={toggleFav} disabled={isDeleting}>
              <Favorite sx={{ color: isFav ? "crimson" : "" }} />
            </IconButton>
            <Typography variant="body1" color="text.secondary" pr={1} mb={-0.25}>
              {likes.length}
            </Typography>
          </Box>
        }
      </Box>
    </MUICardActions>
  );
}