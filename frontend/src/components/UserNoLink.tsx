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

const UserNoLink: React.FC<UserLinkProps> = ({ data }) => {
  return (
    <div className={`min-w-0 font-medium`}>
      {data.anonymous ? (
        <span>Anonymous</span>
      ) : (
        <div className="flex gap-2 items-center min-w-0">
          <Avatar
            size="16"
            src={generateGravatarUrl(String(data.user?.id) || "", 40)}
          />
          <div className={`truncate min-w-0`}>{data.user?.alias || "-"}</div>
        </div>
      )}
    </div>
  );
};

export default UserNoLink;
