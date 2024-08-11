import IdentityTag from "@/components/IdentityTag/IdentityTag";
import { Accordion, Text } from "@mantine/core";

interface FellowshipMatchHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function FellowshipMatchHeader({
  item,
}: FellowshipMatchHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`${item.program.name} at ${item.program.institution.name}`}
        </Text>
        <Text className="text-xs sm:text-sm">{`Year: ${item.year}`}</Text>
        <Text className="text-xs sm:text-sm">{`Match Details: ${item.matchData}`}</Text>
        <div className="flex items-center gap-2">
          {item.user && <IdentityTag user={item.user} />}
        </div>
      </div>
    </Accordion.Control>
  );
}
