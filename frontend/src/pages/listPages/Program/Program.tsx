import ProgramTable from "@/tables/ProgramTable/ProgramTable";
import { Text, Title } from "@mantine/core";
import "./style.scss";
import { useState } from "react";

export default () => {
  const [listView, setListView] = useState(false);
  return (
    <div
      className={`flex flex-col gap-0 ${!listView && "absolute"} program-page`}
    >
      <header>
        <Title
          order={2}
          mb={{ base: "xs", md: "sm" }}
          className="text-lg sm:text-xl md:text-2xl"
        >
          Program Overview
        </Title>
        {/* <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          IM programs for the 2024-2025 cycle.
        </Text> */}
      </header>
      <ProgramTable listView={listView} setListView={setListView} />
    </div>
  );
};
