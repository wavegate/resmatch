import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface PostIVCommunicationHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function PostIVCommunicationHeader({
  item,
}: PostIVCommunicationHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`${item.program.name} at ${item.program.institution.name}`}
        </Text>
        {item.communicationReceived && (
          <Text className="text-xs sm:text-sm">
            {`Communication Received: ${item.communicationReceived}`}
          </Text>
        )}
        {item.thankYouLetterPolicy && (
          <Text className="text-xs sm:text-sm">
            {`Thank You Letter Policy: ${item.thankYouLetterPolicy}`}
          </Text>
        )}
        {item.rankImpact && (
          <Text className="text-xs sm:text-sm">
            {`Rank Impact: ${item.rankImpact}`}
          </Text>
        )}
        {item.source && (
          <Text className="text-xs sm:text-sm">{`Source: ${item.source}`}</Text>
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
