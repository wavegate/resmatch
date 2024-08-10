import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface M4InternImpressionHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function M4InternImpressionHeader({
  item,
}: M4InternImpressionHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`${item.program.name} at ${item.program.institution.name}`}
        </Text>
        {item.positiveImpression && (
          <Text className="text-xs sm:text-sm">
            {`Positive Impression: ${item.positiveImpression}`}
          </Text>
        )}
        {item.negativeImpression && (
          <Text className="text-xs sm:text-sm">
            {`Negative Impression: ${item.negativeImpression}`}
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
