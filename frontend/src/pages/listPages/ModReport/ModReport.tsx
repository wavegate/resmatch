import { APP_NAME } from "@/constants";
import ModReportTable from "@/tables/ModReportTable/ModReportTable";
import { Text, Title } from "@mantine/core";
import { Helmet } from "react-helmet";

export default function ModReport() {
  return (
    <>
      <Helmet>
        <title>Mod Reports | {APP_NAME}</title>
      </Helmet>
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
    </>
  );
}
