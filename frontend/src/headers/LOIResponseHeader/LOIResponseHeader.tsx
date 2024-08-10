import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface LOIResponseHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function LOIResponseHeader({ item }: LOIResponseHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`${item.program.name} at ${item.program.institution.name}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Intent: ${item.intent ? "Yes" : "No"}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Sent To: ${item.sentTo || "N/A"}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Date Sent: ${
            item.dateSent ? new Date(item.dateSent).toLocaleDateString() : "N/A"
          }`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Response: ${item.response ? "Received" : "Not Received"}`}
        </Text>
        {item.responseTone && (
          <Text className="text-xs sm:text-sm">
            {`Response Tone: ${item.responseTone}`}
          </Text>
        )}
        {item.timeBetweenSentAndResponse && (
          <Text className="text-xs sm:text-sm">
            {`Time Between Sent and Response: ${item.timeBetweenSentAndResponse}`}
          </Text>
        )}
        <Text className="text-xs sm:text-sm">
          {`Mentioned Top Choice: ${item.mentionedTopChoice ? "Yes" : "No"}`}
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
