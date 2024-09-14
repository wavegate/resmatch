import USApplicantTable from "@/tables/USApplicantTable/USApplicantTable";
import { Title, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
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
        <title>US Applicants | {APP_NAME}</title>
      </Helmet>
      <div className={`flex flex-col gap-0 absolute program-page`}>
        <header>
          <Title
            order={2}
            mb={{ base: "xs", md: "sm" }}
            className="text-lg sm:text-xl md:text-2xl"
          >
            US Applicant Data
          </Title>
          <Text
            c="dimmed"
            mb={{ base: "xs", md: "sm" }}
            className="text-sm sm:text-base md:text-lg"
          >
            If your{" "}
            <Link to="/profile" className={`text-blue-500 underline`}>
              Profile
            </Link>{" "}
            is public, your stats will show up here.
          </Text>
        </header>
        <USApplicantTable listView={listView} setListView={setListView} />
      </div>
    </>
  );
};
