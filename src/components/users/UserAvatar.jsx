import { Avatar } from "@mui/material";
import { stringToColor } from "../../utils/string";
import { useMemo } from "react";

const DEFAULT_AVATAR = "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png";

export default function UserAvatar({ user, sx, ...props }) {
  const src = user.image.url == DEFAULT_AVATAR ? "" : user.image.url;
  const alt = user.image.alt || user.shortName;

  const bgcolor = useMemo(() => src ? "" : stringToColor(user.email), [src, user]);

  return <Avatar {...{ src, alt, ...props }} sx={[{ bgcolor }, sx]} />;
}