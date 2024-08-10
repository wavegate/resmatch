import { Accordion, Text } from "@mantine/core";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface CommentHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function CommentHeader({ item }: CommentHeaderProps) {
  return (
    <Accordion.Control className={`pl-0`}>
      <div className="flex flex-col gap-1">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {item.content}
        </Text>
        <div className={`flex items-center gap-2`}>
          <Link to={`/user/${item.user.id}`}>
            <Text c="dimmed" className="text-xs sm:text-sm underline">
              {item.user.alias}
            </Text>
          </Link>
          <Text c="dimmed" className="text-xs sm:text-sm">
            {dayjs(item.createdAt).format("MMM D, YYYY")}
          </Text>
        </div>
      </div>
    </Accordion.Control>
  );
}
