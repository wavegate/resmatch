import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface RankListHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function RankListHeader({ item }: RankListHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`Rank List`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Number of Programs Applied: ${item.numProgramsApplied}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Number of Invites: ${item.numInvites}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Number of Interviews Attended: ${item.numInterviewsAttended}`}
        </Text>
        {item.matchedProgram && (
          <Text className="text-xs sm:text-sm">
            {`Matched Program: ${item.matchedProgram.name} at ${item.matchedProgram.institution.name}`}
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
