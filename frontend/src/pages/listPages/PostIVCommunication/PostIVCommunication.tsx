import PostIVCommunicationsTable from "@/tables/PostIVCommunicationsTable/PostIVCommunicationsTable";
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
          Post-IV Communications
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          Manage and review post-interview communications.
        </Text>
      </header>
      <PostIVCommunicationsTable />
    </div>
  );
};
