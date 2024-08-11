import IdentityTag from "@/components/IdentityTag/IdentityTag";
import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface ImpressionHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function ImpressionHeader({ item }: ImpressionHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`${item.program.name} at ${item.program.institution.name}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Positives: ${item.positives}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Negatives: ${item.negatives}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Impact on Rank: ${item.howInterviewDayAffectsRank}`}
        </Text>
        {item.gift && (
          <Text className="text-xs sm:text-sm">
            {`Gift Received: ${item.gift} at ${item.timeGiftReceived}`}
          </Text>
        )}
        <div className="flex items-center gap-2">
          {item.user && <IdentityTag user={item.user} />}
        </div>
      </div>
    </Accordion.Control>
  );
}
