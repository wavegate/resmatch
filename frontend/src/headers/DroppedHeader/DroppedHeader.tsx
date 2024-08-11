import IdentityTag from "@/components/IdentityTag/IdentityTag";
import { Accordion, Text } from "@mantine/core";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface DroppedHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function DroppedHeader({ item }: DroppedHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="grid grid-cols-[1fr] gap-4">
        <div className="flex flex-col gap-1">
          <Text className="text-sm sm:text-md md:text-lg font-medium">
            {`${item.program.name} at ${item.program.institution.name}`}
          </Text>
          <Text className="text-xs sm:text-sm">
            Dropped on {dayjs(item.dateDropped).format("MMM D, YYYY")}
          </Text>
          <div className="flex items-center gap-2">
            {item.user && <IdentityTag user={item.user} />}
          </div>
        </div>
      </div>
    </Accordion.Control>
  );
}
