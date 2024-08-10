import ImpressionsTable from "@/tables/ImpressionsTable/ImpressionsTable";
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
          Interview Impressions
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          Review and analyze interview impressions shared by users.
        </Text>
      </header>
      <ImpressionsTable />
    </div>
  );
};
