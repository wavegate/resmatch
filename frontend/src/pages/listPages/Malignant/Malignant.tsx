import MalignantTable from "@/tables/MalignantTable/MalignantTable";
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
          Malignant Programs
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          Explore and manage reports of malignant programs.
        </Text>
      </header>
      <MalignantTable />
    </div>
  );
};
