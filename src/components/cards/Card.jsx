import { Call, Delete, Edit, Favorite } from "@mui/icons-material";
import { CardActionArea, CardHeader as MUICardHeader, Divider, CardContent, Typography, Card as MUICard, CardActions as MUICardActions, Box, IconButton, CircularProgress, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Router";
import { useLayoutEffect, useMemo, useState } from "react";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import EllipsisText from "../content/EllipsisText";
import CardModel from "../../models/CardModel";
import { useErrorCallback, usePageUI } from "../../providers/PageUIProvider";
import CardImage from "./CardImage";

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
  const imageUrl = typeof image == "object" ? image.url : image;
  const imageAlt = image?.alt || title;

  return (
    <>
      <CardImage image={imageUrl} alt={imageAlt} sx={{ aspectRatio: 2 }} />
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
      [address.street, address.houseNumber].filter(part => part ?? false).join(" "),
      address.city,
      address.country,
    ].filter(part => part ?? false).join(", ") : address,
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
  const { setNotificationMessage, confirm } = usePageUI();

  const [isLiked, setIsLiked] = useState(likes.includes(user?._id));
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = useErrorCallback(async () => {
    if (await confirm("Delete Card", "Are you sure you want to delete this card?")) {
      setIsDeleting(true);
      const card = await CardModel.load(id);
      await card.delete().finally(() => setIsDeleting(false));
      onChange && onChange();
      setNotificationMessage("Business card has been deleted.");
    }
  }, [onChange]);

  const toggleLike = useErrorCallback(async () => {
    const card = await CardModel.load(id);
    const update = () => setIsLiked(card.isLikedBy(user)) || onChange && onChange();
    const likePromise = card.toggleLike(user);
    update();
    await likePromise.finally(update);
  }, [id, user]);

  useLayoutEffect(() => {
    setIsLiked(user && likes.includes(user._id));
  }, [likes, user]);

  return (
    <MUICardActions sx={{ justifyContent: "space-between" }}>
      <Box display="flex">
        {(user?._id == ownerId || user?.isAdmin) && (
          <Tooltip title="Delete">
            <IconButton onClick={onDelete} disabled={isDeleting}>
              {isDeleting ? <CircularProgress size={20} /> : <Delete />}
            </IconButton>
          </Tooltip>
        )}
        {user?.isBusiness && user._id == ownerId && (
          <Tooltip title="Edit">
            <IconButton LinkComponent={Link} to={`${ROUTES.editCard}/${id}`} disabled={isDeleting}>
              <Edit />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Box display="flex">
        <Tooltip title="Start Chat">
          <IconButton
            LinkComponent={Link}
            to={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`}
            target="_blank"
            disabled={isDeleting}
          >
            <Call />
          </IconButton>
        </Tooltip>
        {user && (
          <Box display="flex" alignItems="center">
            <Tooltip title={isLiked ? "Unlike" : "Like"}>
              <IconButton onClick={toggleLike} disabled={isDeleting}>
                <Favorite sx={{ color: isLiked ? "crimson" : "" }} />
              </IconButton>
            </Tooltip>
            <Typography variant="body1" color="text.secondary" pr={1} mb={-0.25}>
              {likes.length}
            </Typography>
          </Box>
        )}
      </Box>
    </MUICardActions>
  );
}
