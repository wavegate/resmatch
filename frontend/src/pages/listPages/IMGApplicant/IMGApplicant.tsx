import { APP_NAME } from "@/constants";
import IMGApplicantTable from "@/tables/IMGApplicantTable/IMGApplicantTable";
import { Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

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
        <title>IMG Applicants | {APP_NAME}</title>
      </Helmet>
      <div className={`flex flex-col gap-0 absolute program-page`}>
        <header>
          <Title
            order={2}
            mb={{ base: "xs", md: "sm" }}
            className="text-lg sm:text-xl md:text-2xl"
          >
            IMG Applicant Data
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
        <IMGApplicantTable listView={listView} setListView={setListView} />
      </div>
    </>
  );
};
