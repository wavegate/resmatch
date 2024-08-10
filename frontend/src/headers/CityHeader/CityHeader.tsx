import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface CityHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function CityHeader({ item }: CityHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="grid grid-cols-[1fr] gap-4">
        <div className="flex flex-col gap-1">
          <Text className="text-sm sm:text-md md:text-lg font-medium">
            {`${item.name}, ${item.state}`}
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
      </div>
    </Accordion.Control>
  );
}
