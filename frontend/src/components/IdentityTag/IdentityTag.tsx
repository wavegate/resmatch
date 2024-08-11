import { Avatar, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export default ({ user }) => {
  return (
    <div className={`flex items-center gap-2`}>
      <Avatar size="sm" />
      <Link to={`/user/${user.id}`}>
        <Text c="dimmed" className="text-xs sm:text-sm underline">
          {user.alias}
        </Text>
      </Link>
    </div>
  );
};
