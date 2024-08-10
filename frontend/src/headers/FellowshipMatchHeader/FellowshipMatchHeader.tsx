import { Accordion, Text } from "@mantine/core";
import dayjs from "dayjs";

interface FellowshipMatchHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function FellowshipMatchHeader({
  item,
}: FellowshipMatchHeaderProps) {
  return (
    <Accordion.Control className={`pl-0`}>
      <div className="flex flex-col gap-1">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`${item.program.name} - ${item.year}`}
        </Text>
        <Text c="dimmed" className="text-xs sm:text-sm">
          {item.user.alias} | {dayjs(item.createdAt).format("MMM D, YYYY")}
        </Text>
        <Text className="text-xs sm:text-sm">
          {item.details}{" "}
          {/* Assuming `details` contains the fellowship match data */}
        </Text>
      </div>
    </Accordion.Control>
  );
}
