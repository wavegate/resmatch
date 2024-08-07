import UsersTable from "@/components/UsersTable/UsersTable";
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
          Applicants
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          Compare and analyze stats and trends across other applicants to help
          guide your match list decision-making, providing valuable insights for
          crafting a competitive and informed ranking strategy.
        </Text>
      </header>
      <UsersTable />
    </div>
  );
};
