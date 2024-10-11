import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mantine/core"; // Replace with your UI library's Avatar component
import { generateGravatarUrl } from "@/utils/utils";

interface User {
  id: string | number;
  email: string;
  alias: string;
}

interface Data {
  anonymous: boolean;
  user?: User;
}

interface UserLinkProps {
  data: Data;
}

const UserLink: React.FC<UserLinkProps> = ({ data }) => {
  return data?.anonymous ? (
    "Anonymous"
  ) : (
    <Link
      to={`/user/${data?.user?.id}`}
      className="hover:underline flex gap-2 items-center"
    >
      <Avatar
        size="16"
        src={generateGravatarUrl(String(data?.user?.id) || "", 40)}
      />
      <div>{data?.user?.alias || "-"}</div>
    </Link>
  );
};

export default UserLink;
