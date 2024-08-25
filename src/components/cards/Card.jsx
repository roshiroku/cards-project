import { Call, Delete, Edit, Favorite } from "@mui/icons-material";
import { CardActionArea, CardMedia, CardHeader as MUICardHeader, Divider, CardContent, Typography, Card as MUICard, CardActions as MUICardActions, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router";

export default function Card({ _id, title, subtitle, phone, image, address, bizNumber }) {
  const navigate = useNavigate();

  return (
    <MUICard sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardActionArea
        onClick={() => navigate(`${ROUTES.cardInfo}/${_id}`)}
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "stretch" }}>
        <CardHeader {...{ title, subtitle, image }} />
        <CardBody {...{ phone, address, bizNumber }} />
      </CardActionArea>
      <CardActions />
    </MUICard>
  );
}

export function CardHeader({ title, subtitle, image }) {
  return (
    <>
      <CardMedia sx={{ height: 140 }} image={image.url} alt={image.alt} />
      <MUICardHeader
        title={title}
        subheader={subtitle}
        sx={{
          "& .MuiCardHeader-content": { maxWidth: "100%" },
          "& .MuiTypography-root": { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }
        }} />
      <Divider variant="middle" />
    </>
  );
}

export function CardBody({ phone, address, bizNumber }) {
  return (
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        <strong>Phone:</strong> {phone}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <strong>Address:</strong> {address.city} {address.street} {address.houseNumber}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <strong>Card Number:</strong> {bizNumber}
      </Typography>
    </CardContent>
  );
}

export function CardActions() {
  return (
    <MUICardActions sx={{ justifyContent: "space-between" }}>
      <Box display="flex">
        <IconButton>
          <Delete />
        </IconButton>
        <IconButton>
          <Edit />
        </IconButton>
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