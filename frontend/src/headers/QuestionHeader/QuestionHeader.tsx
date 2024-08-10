import { Accordion, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface QuestionHeaderProps {
  item: any; // Replace with the correct type if available
}

export default function QuestionHeader({ item }: QuestionHeaderProps) {
  return (
    <Accordion.Control className="pl-0">
      <div className="flex flex-col gap-2">
        <Text className="text-sm sm:text-md md:text-lg font-medium">
          {`Question`}
        </Text>
        {item.questions?.map((question, index) => (
          <Text key={index} className="text-xs sm:text-sm">
            {question}
          </Text>
        ))}
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
