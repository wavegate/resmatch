import ProgramTable from "@/tables/ProgramTable/ProgramTable";
import { Title } from "@mantine/core";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { APP_NAME } from "@/constants";
import { useMediaQuery } from "@mantine/hooks";

export default () => {
  const matches = useMediaQuery("(max-width: 768px)");
  const [listView, setListView] = useState(false);
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current && matches !== undefined) {
      setListView(matches);
      firstLoad.current = false;
    }
  }, [matches]);

  return (
    <>
      <Helmet>
        <title>Program Overview | {APP_NAME}</title>
      </Helmet>
      <div className={`flex flex-col gap-0 absolute program-page`}>
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
    </>
  );
};
