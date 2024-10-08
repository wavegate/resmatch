import { APP_NAME } from "@/constants";
import PSTPTable from "@/tables/PSTPTable/PSTPTable";
import { Text, Title } from "@mantine/core";
import { Helmet } from "react-helmet";

export default () => {
  return (
    <>
      <Helmet>
        <title>PSTP | {APP_NAME}</title>
      </Helmet>
      <div className={`flex flex-col gap-2`}>
        <header>
          <Title
            order={2}
            mb={{ base: "xs", md: "sm" }}
            className="text-lg sm:text-xl md:text-2xl"
          >
            PSTP Discussion
          </Title>
          <Text
            c="dimmed"
            mb={{ base: "xs", md: "sm" }}
            className="text-sm sm:text-base md:text-lg"
          >
            Join the conversation and discuss topics related to PSTP (Physician
            Scientist Training Program).
          </Text>
        </header>
        <PSTPTable />
      </div>
    </>
  );
};
