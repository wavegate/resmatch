import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

interface WithdrawalHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function WithdrawalHeader({ item }: WithdrawalHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`${item.program.name} at ${item.program.institution.name}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Date of Withdrawal: ${dayjs(item.date).format("MMM D, YYYY")}`}
        </Text>
        {item.reason && (
          <Text className="text-xs sm:text-sm">{`Reason: ${item.reason}`}</Text>
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
