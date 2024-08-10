import M4InternImpressionTable from "@/tables/M4InternImpressionTable/M4InternImpressionTable";
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
          M4 Intern Impressions
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          Explore and manage impressions from M4 interns.
        </Text>
      </header>
      <M4InternImpressionTable />
    </div>
  );
};
