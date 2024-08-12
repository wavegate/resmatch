import RankListTable from "@/tables/RankListTable/RankListTable";
import { Text, Title } from "@mantine/core";

export default () => {
  return (
    <div className="flex flex-col gap-2">
      <header>
        <Title
          order={2}
          mb={{ base: "xs", md: "sm" }}
          className="text-lg sm:text-xl md:text-2xl"
        >
          Rank Lists (DO)
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          Explore your rank lists and compare your program choices. Manage your
          preferences and finalize your matched programs with ease.
        </Text>
      </header>
      <RankListTable type="DO" />
    </div>
  );
};
