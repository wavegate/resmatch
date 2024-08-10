import XorYTable from "@/tables/XorYTable/XorYTable";
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
          X or Y Program Comparisons
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          Compare programs side by side and explore related discussions.
        </Text>
      </header>
      <XorYTable />
    </div>
  );
};
