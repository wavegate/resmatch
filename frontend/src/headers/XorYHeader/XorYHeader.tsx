import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface XorYHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function XorYHeader({ item }: XorYHeaderProps) {
  return (
    <Accordion.Control className={`pl-0`}>
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          Comparison: {item.programX.name} vs. {item.programY.name}
        </Text>
        <div className="flex items-center gap-2">
          <Text className="text-xs sm:text-sm c-dimmed">
            Question: {item.question}
          </Text>
          <Text className="text-xs sm:text-sm c-dimmed">
            Date: {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </div>
      </div>
    </Accordion.Control>
  );
}
