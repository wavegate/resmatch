import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

interface RejectionHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function RejectionHeader({ item }: RejectionHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`${item.program.name} at ${item.program.institution.name}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Date of Rejection: ${dayjs(item.date).format("MMM D, YYYY")}`}
        </Text>
        <div className="flex items-center gap-2">
          {item.user && (
            <Link to={`/user/${item.user.id}`}>
              <Text c="dimmed" className="text-xs sm:text-sm underline">
                {item.user.alias}
              </Text>
            </Link>
          )}
        </div>
      </div>
    </Accordion.Control>
  );
}
