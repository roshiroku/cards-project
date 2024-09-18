import { CardMedia } from "@mui/material";
import { useEffect, useState } from "react";

const DEFAULT_CARD_IMAGE = "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg";

export default function CardImage({ image, alt, ...props }) {
  const [src, setSrc] = useState(image);

  useEffect(() => {
    const img = new Image();
    img.src = image;

    if (img.complete) {
      setSrc(img.src);
    } else {
      img.onload = () => setSrc(image);
    }

    img.onerror = () => setSrc(DEFAULT_CARD_IMAGE);
  }, [image]);

  return <CardMedia component="img" image={src || DEFAULT_CARD_IMAGE} alt={alt} {...props} />;
}