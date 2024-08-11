import USApplicantTable from "@/tables/USApplicantTable/USApplicantTable";
import { Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className={`flex flex-col gap-2`}>
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
          Compare and analyze stats and trends across other applicants to help
          guide your match list decision-making. If your{" "}
          <Link to="/profile" className={`text-blue-500 underline`}>
            Profile
          </Link>{" "}
          is public, your stats will show up here.
        </Text>
      </header>
      <USApplicantTable />
    </div>
  );
};
