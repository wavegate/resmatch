import FellowshipMatchTable from "@/tables/FellowshipMatchTable/FellowshipMatchTable";
import { Text, Title } from "@mantine/core";

export default function FellowshipMatch() {
  return (
    <div className={`flex flex-col gap-2`}>
      <header>
        <Title
          order={2}
          mb={{ base: "xs", md: "sm" }}
          className="text-lg sm:text-xl md:text-2xl"
        >
          Fellowship Matches
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          View and manage fellowship match details.
        </Text>
      </header>
      <FellowshipMatchTable />
    </div>
  );
}
