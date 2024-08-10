import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface ProgramHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function ProgramHeader({ item }: ProgramHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`${item.name} at ${item.institution.name}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Specialty: ${item.specialty.name}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Location: ${item.institution.city?.name}, ${item.institution.city?.state}`}
        </Text>
        <div className="flex items-center gap-2">
          <Link to={`/program/${item.id}`}>
            <Text c="dimmed" className="text-xs sm:text-sm underline">
              View Program Details
            </Text>
          </Link>
        </div>
      </div>
    </Accordion.Control>
  );
}
