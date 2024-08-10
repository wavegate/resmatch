import ProgramsTable from "@/tables/ProgramsTable/ProgramsTable";
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
          Programs
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          Find your best fit among internal medicine residency programs across
          the U.S., with detailed information and unique insights provided by
          fellow applicants.
        </Text>
      </header>
      <ProgramsTable />
    </div>
  );
};
