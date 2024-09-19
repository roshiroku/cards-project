import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { Container, Box, Typography, Grid, Card, IconButton, Button } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CardModel from "../../models/CardModel";
import { useErrorCallback, useLoadCallback, useLoadEffect, usePageUI } from "../../providers/PageUIProvider";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import ContentLoader from "../../components/layout/ContentLoader";
import LinkButton from "../../components/content/LinkButton";
import { ROUTES } from "../../Router";
import EllipsisText from "../../components/content/EllipsisText";
import { Business, Email, Favorite, Language, LocationOn, Phone } from "@mui/icons-material";
import CardImage from "../../components/cards/CardImage";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function CardPage() {
  const [card, setCard] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthentication();
  const { setNotificationMessage, confirm } = usePageUI();

  const isOwner = useMemo(() => user?._id == card?.user_id, [user, card]);

  const handleDelete = useLoadCallback(() => card.delete(), [card]);

  const onDelete = useCallback(async () => {
    if (await confirm("Delete Card", "Are you sure you want to delete this card?")) {
      await handleDelete();
      setNotificationMessage("Business card has been deleted.");
      navigate(ROUTES.myCards);
    }
  }, [handleDelete]);

  const onLike = useErrorCallback(async () => {
    const update = () => setIsLiked(card.isLikedBy(user));
    const likePromise = card.toggleLike(user);
    update();
    await likePromise.finally(update);
  }, [user, card]);

  useDocumentTitle("LeCard - Business Card Details");

  useLayoutEffect(() => {
    setIsLiked(user && card?.isLikedBy(user));
  }, [user, card]);

  useLoadEffect(async () => setCard(await CardModel.load(id)), [id]);

  return (
    <Container sx={{ py: 6 }}>
      <ContentLoader>
        {card ? (
          <Grid container spacing={4}>
            {card.image.url && (
              <Grid item xs={12} md={6}>
                <Card>
                  <CardImage height="400" image={card.image.url} alt={card.image.alt || card.title} />
                </Card>
              </Grid>
            )}
            <Grid item xs={12} md={card.image.url ? 6 : 12}>
              <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {card.subtitle}
                </Typography>
                <Typography variant="body1" paragraph>
                  {card.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {card.phone && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Phone color="action" sx={{ mr: 1 }} />
                      <Typography variant="body1" overflow="hidden">
                        <EllipsisText>{card.phone}</EllipsisText>
                      </Typography>
                    </Box>
                  )}
                  {card.email && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Email color="action" sx={{ mr: 1 }} />
                      <Typography variant="body1" overflow="hidden">
                        <EllipsisText>{card.email}</EllipsisText>
                      </Typography>
                    </Box>
                  )}
                  {card.web && (
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Language color="action" sx={{ mr: 1 }} />
                      <Typography variant="body1" overflow="hidden" color="primary">
                        <EllipsisText>
                          <a href={card.web} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
                            {card.web}
                          </a>
                        </EllipsisText>
                      </Typography>
                    </Box>
                  )}
                </Box>
                {card.address && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      <LocationOn sx={{ verticalAlign: "middle", mr: 1 }} />
                      Address
                    </Typography>
                    <Typography variant="body1">
                      {[card.address.street, card.address.houseNumber].filter(part => part ?? false).join(", ")}
                    </Typography>
                    <Typography variant="body1">
                      {[card.address.city, card.address.state, card.address.zip].filter(Boolean).join(", ")}
                    </Typography>
                    <Typography variant="body1">{card.address.country}</Typography>
                  </Box>
                )}
                {card.bizNumber && (
                  <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                    <Business color="action" sx={{ mr: 1 }} />
                    <Typography variant="body1">Business Number: {card.bizNumber}</Typography>
                  </Box>
                )}
                {user && (
                  <Box sx={{ mt: 3, display: "flex", alignItems: "center" }}>
                    <IconButton onClick={onLike}>
                      <Favorite sx={{ color: isLiked ? "crimson" : "" }} />
                    </IconButton>
                    <Typography variant="body1">{card.likes.length} {card.likes.length == 1 ? "Like" : "Likes"}</Typography>
                  </Box>
                )}
                {isOwner && (
                  <Box sx={{ mt: 4 }}>
                    <LinkButton to={ROUTES.editCard + `/${card._id}`} variant="contained" color="primary" sx={{ mr: 2 }}>
                      Edit
                    </LinkButton>
                    <Button variant="outlined" color="error" onClick={onDelete}>
                      Delete
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Navigate to={ROUTES.error + "/404"} replace />
        )}
      </ContentLoader>
    </Container>
  );
}
