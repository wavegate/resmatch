import { Text, Title } from "@mantine/core";
import FameShameTable from "@/components/FameShameTable/FameShameTable";

export default () => {
  return (
    <div className={`flex flex-col gap-2`}>
      <header>
        <Title
          order={2}
          mb={{ base: "xs", md: "sm" }}
          className="text-lg sm:text-xl md:text-2xl"
        >
          Fame & Shame
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          Discover insights from fellow applicants about residency programs,
          highlighting the positive and negative experiences shared through
          anonymous inputs.
        </Text>
      </header>
      <FameShameTable />
    </div>
  );
};
