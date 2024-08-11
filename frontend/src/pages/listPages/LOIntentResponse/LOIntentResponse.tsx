import LOIntentResponseTable from "@/tables/LOIntentResponseTable/LOIntentResponseTable";
import LOInterestResponseTable from "@/tables/LOInterestResponseTable/LOInterestResponseTable";
import { Text, Title } from "@mantine/core";

export default () => {
  return (
    <div className={`flex flex-col gap-2`}>
      <header>
        <Title
          order={2}
          mb={{ base: "xs", md: "sm" }}
          className="text-lg sm:text-xl md:text-2xl"
        >
          Letter of Intent Responses
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          Review and manage responses to Letters of Intent.
        </Text>
      </header>
      <LOIntentResponseTable />
    </div>
  );
};
