import IdentityTag from "@/components/IdentityTag/IdentityTag";
import { Accordion, Text } from "@mantine/core";

interface ScheduleDetailsHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function ScheduleDetailsHeader({
  item,
}: ScheduleDetailsHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`${item.program.name} at ${item.program.institution.name}`}
        </Text>
        <Text className="text-xs sm:text-sm">{`EMR: ${item.emr}`}</Text>
        <Text className="text-xs sm:text-sm">
          {`Long Overnight Call: ${item.longOvernightCall}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Start Date Orientation: ${
            item.startDateOrientation
              ? new Date(item.startDateOrientation).toLocaleDateString()
              : "N/A"
          }`}
        </Text>
        <div className="flex items-center gap-2">
          {item.user && <IdentityTag user={item.user} />}
        </div>
      </div>
    </Accordion.Control>
  );
}
