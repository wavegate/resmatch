import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface LogisticsHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function LogisticsHeader({ item }: LogisticsHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`${item.program.name} at ${item.program.institution.name}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Scheduler Platform: ${item.schedulerPlatform}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Interview Format: ${item.ivFormat}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Time Slots: ${item.timeSlots}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Interview Platform: ${item.ivPlatform}`}
        </Text>
        {item.openIVDates?.length > 0 && (
          <Text className="text-xs sm:text-sm">
            {`Open Interview Dates: ${item.openIVDates.join(", ")}`}
          </Text>
        )}
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
