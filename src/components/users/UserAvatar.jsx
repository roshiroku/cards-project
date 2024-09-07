import { Avatar } from "@mui/material";
import { capitalize, stringToColor } from "../../utils/string";
import { useMemo } from "react";

export default function UserAvatar({ user }) {
  const alt = useMemo(() => {
    return user.image.alt || capitalize(`${user.name.first} ${user.name.last}`);
  }, [user.image, user.name]);

  const bgcolor = useMemo(() => stringToColor(user.email), [user.email]);

  return <Avatar src={user.image.src} alt={alt} sx={{ bgcolor }} />;
}