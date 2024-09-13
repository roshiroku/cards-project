import { Avatar } from "@mui/material";
import { capitalize, stringToColor } from "../../utils/string";
import { useMemo } from "react";

const DEFAULT_AVATAR = "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png";

export default function UserAvatar({ user }) {
  const src = useMemo(() => user.image.url == DEFAULT_AVATAR ? "" : user.image.url, [user.image]);

  const alt = useMemo(() => {
    return user.image.alt || capitalize(`${user.name.first} ${user.name.last}`);
  }, [user.image, user.name]);

  const bgcolor = useMemo(() => src ? "" : stringToColor(user.email), [src, user.email]);

  return <Avatar {...{ src, alt }} sx={{ bgcolor }} />;
}