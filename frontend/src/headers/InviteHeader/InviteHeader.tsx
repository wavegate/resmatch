import { Accordion, Avatar, Text } from "@mantine/core";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface InviteHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function InviteHeader({ item }: InviteHeaderProps) {
  return (
    <Accordion.Control className={`pl-0`}>
      <div className="grid grid-cols-[80px,60px,1fr] max-sm:grid-cols-[80px,1fr] gap-4">
        <div className="flex flex-col justify-center items-center text-gray-700 border border-solid rounded">
          <Text className="text-lg font-medium">
            {dayjs(item.inviteDateTime).format("MMM D")}
          </Text>
          <Text c="dimmed" className="text-xs">
            {dayjs(item.inviteDateTime).format("YYYY")}
          </Text>
        </div>
        <div className={`flex items-center justify-center max-sm:hidden`}>
          <img
            className={`object-cover h-full`}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDSi-o3c7GQB3mphyLYYIsD8m5xiZ4dDTzNg&s"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Text className="text-sm sm:text-md md:text-lg font-medium">
            {`${item.program.name} at ${item.program.institution.name}`}
          </Text>
          <div className={`flex items-center gap-2`}>
            <Avatar size="sm" />
            {item.anonymous ? (
              <Text c="dimmed" className="text-xs sm:text-sm">
                Anonymous
              </Text>
            ) : (
              <Link to={`/user/${item.user.id}`}>
                <Text c="dimmed" className="text-xs sm:text-sm underline">
                  {item.user.alias}
                </Text>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Accordion.Control>
  );
}
