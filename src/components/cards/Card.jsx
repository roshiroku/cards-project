import { Call, Delete, Edit, Favorite } from "@mui/icons-material";
import { CardActionArea, CardMedia, CardHeader as MUICardHeader, Divider, CardContent, Typography, Card as MUICard, CardActions as MUICardActions, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import { useMemo } from "react";
import { useTheme } from "../../providers/ThemeProvider";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import EllipsisText from "../content/EllipsisText";

export default function Card({ id, userId, title, subtitle, phone, image, address, bizNumber }) {
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
      <CardActions {...{ id, userId }} />
    </MUICard>
  );
}

export function CardHeader({ title, subtitle, image }) {
  const imageUrl = useMemo(() => typeof image == "object" ? image.url : image, [image]);
  const imageAlt = useMemo(() => typeof image == "object" ? image.alt : title, [image, title]);
  const { theme } = useTheme();

  return (
    <>
      <CardMedia sx={{ height: 140 }} image={imageUrl} alt={imageAlt}>
        {
          !imageUrl &&
          <Box bgcolor={theme.palette.grey[400]} height="100%" display="flex" justifyContent="center" alignItems="center">
            Image? plz?
          </Box>
        }
      </CardMedia>
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

export function CardActions({ id, userId }) {
  const { user } = useAuthentication();
  const navigate = useNavigate();

  return (
    <MUICardActions sx={{ justifyContent: "space-between" }}>
      <Box display="flex">
        {
          user?._id == userId &&
          <>
            <IconButton>
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
        <IconButton>
          <Favorite />
        </IconButton>
      </Box>
    </MUICardActions>
  );
}