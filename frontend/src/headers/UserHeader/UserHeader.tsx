import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface UserHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function UserHeader({ item }: UserHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {item.alias}
        </Text>
        <Text className="text-xs sm:text-sm">{`Email: ${item.email}`}</Text>
        <Text className="text-xs sm:text-sm">
          {`Year of Graduation: ${item.yearOfGraduation || "N/A"}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`School Ranking: ${item.schoolRanking || "N/A"}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Step 1 Score: ${item.step1Score || "N/A"}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`Step 2 Score: ${item.step2Score || "N/A"}`}
        </Text>
        <Text className="text-xs sm:text-sm">
          {`ECFMG Certified: ${item.ecfmgCertified ? "Yes" : "No"}`}
        </Text>
      </div>
    </Accordion.Control>
  );
}
