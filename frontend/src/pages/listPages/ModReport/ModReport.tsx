import ModReportTable from "@/tables/ModReportTable/ModReportTable";
import { Text, Title } from "@mantine/core";

export default function ModReport() {
  return (
    <div className={`flex flex-col gap-2`}>
      <header>
        <Title
          order={2}
          mb={{ base: "xs", md: "sm" }}
          className="text-lg sm:text-xl md:text-2xl"
        >
          Mod Reports
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          Report issues to moderators.
        </Text>
      </header>
      <ModReportTable />
    </div>
  );
}
