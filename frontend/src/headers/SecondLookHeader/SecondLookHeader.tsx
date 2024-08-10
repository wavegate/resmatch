import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

interface SecondLookHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function SecondLookHeader({ item }: SecondLookHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`${item.program.name} at ${item.program.institution.name}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Second Look Setting: ${item.setting || "N/A"}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Date: ${
            item.date ? dayjs(item.date).format("MMM D, YYYY") : "N/A"
          }`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Bearing on Rank: ${item.bearingOnRank || "N/A"}`}
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
