import userService from "@/services/userService";
import { Accordion, Drawer, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import UserHeader from "@/headers/UserHeader/UserHeader";
import UserDetails from "@/details/UserDetails/UserDetails";
import { PAGE_SIZE } from "@/constants";
import Filters from "@/components/Filters/Filters";
import Controls from "@/components/Controls/Controls";
import Badges from "@/components/Badges/Badges";
import { DataTable } from "mantine-datatable";
import { fieldLabelMap } from "@/schemas/fieldLabelMap";
import { Link } from "react-router-dom";

interface UserTableProps {
  className?: string;
}

export default ({ className }: UserTableProps) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["user", "IMG", selectedProgram, pageNum],
    queryFn: () => {
      return userService.searchUser({
        programId: selectedProgram?.id,
        pageNum,
        graduateType: "IMG",
      });
    },
  });

  const clearFilters = () => {
    setSelectedProgram(null);
    setPageNum(1);
  };

  const [opened, { open, close }] = useDisclosure(false);

  const totalPages = useMemo(() => {
    if (data) {
      const totalCount = data?.totalCount || 0;
      return Math.ceil(totalCount / PAGE_SIZE);
    }
  }, [data?.totalCount]);

  const filtersPresent = useMemo(() => {
    return !!selectedProgram;
  }, [selectedProgram]);

  // Example columns array for the Mantine DataTable
  const columns = [
    {
      accessor: "alias",
      title: "Alias",
      render: ({ id, alias }) => (
        <Link to={`/user/${id}`} className={`underline`}>
          {alias}
        </Link>
      ),
    },
    // { accessor: "graduateType", title: "Graduate Type" },
    { accessor: "img", title: "IMG Type" },
    // { accessor: "medicalDegree", title: "Medical Degree" },
    {
      accessor: "schoolRanking",
      title: "School Ranking",
      render: ({ schoolRanking }) => {
        return fieldLabelMap["schoolRanking"][schoolRanking];
      },
    },
    {
      accessor: "classRank",
      title: "Class Rank",
      render: ({ classRank }) => {
        return fieldLabelMap["classRank"][classRank];
      },
    },
    {
      accessor: "visaRequired",
      title: "Visa Required",
    },
    {
      accessor: "greenCard",
      title: "Green Card",
    },
    { accessor: "monthsOfUSCE", title: "Months of USCE" },
    {
      accessor: "ecfmgCertified",
      title: "ECFMG Certified",
    },

    // { accessor: "step1ScorePass", title: "Step 1 Score Pass" },
    // { accessor: "step1Score", title: "Step 1 Score" },
    { accessor: "step2Score", title: "Step 2 Score" },
    // { accessor: "comlex1ScorePass", title: "COMLEX 1 Score Pass" },
    // { accessor: "comlex2Score", title: "COMLEX 2 Score" },
    { accessor: "redFlags", title: "Red Flags" },
    { accessor: "redFlagsExplanation", title: "Red Flags Explanation" },
    { accessor: "honors", title: "Honors" },
    { accessor: "highPass", title: "High Pass" },
    { accessor: "pass", title: "Pass" },
    { accessor: "fail", title: "Fail" },
    // { accessor: "aoa" },
    // { accessor: "sigmaSigmaPhi" },
    // { accessor: "goldHumanism" },
    { accessor: "yearOfGraduation", title: "Year of Graduation" },
    { accessor: "numPublications", title: "# Publications" },
    { accessor: "numWorkExperiences", title: "# Work Experiences" },
    {
      accessor: "numVolunteerExperiences",
      title: "Number of Volunteer Experiences",
    },
    { accessor: "otherDegrees", title: "Other Degrees" },
    { accessor: "pstp", title: "PSTP" },
    { accessor: "numApplications", title: "# Applications" },
    { accessor: "numInterviews", title: "# Interviews" },
    { accessor: "numWithdrawn", title: "# Withdrawn Applications" },
    { accessor: "numRejected", title: "# Rejections" },
    { accessor: "numWaitlisted", title: "# Waitlisted Programs" },
    { accessor: "applicationYear", title: "Application Year" },
  ];

  return (
    <div className={`${className}`}>
      <Drawer opened={opened} onClose={close} title="Filters" position="bottom">
        <Filters
          selectedProgram={selectedProgram}
          setSelectedProgram={setSelectedProgram}
          clearFilters={clearFilters}
        />
      </Drawer>

      <Controls
        noFilters
        noShare
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPages={totalPages}
        openFilters={open}
        shareUrl="/user/add"
        shareText="Share User"
      />

      {filtersPresent && (
        <Badges
          selectedProgram={selectedProgram}
          setSelectedProgram={setSelectedProgram}
        />
      )}
      <div className={`mt-4`}>
        {isLoading && (
          <div className={`flex flex-col items-center`}>
            <Loader color="blue" className={`mt-12`} />
          </div>
        )}
        <DataTable
          withTableBorder
          borderRadius="sm"
          withColumnBorders
          striped
          highlightOnHover
          // provide data
          records={data?.users}
          // define columns
          columns={columns}
          // execute this callback when a row is clicked
        />
        {/* {data?.users?.length > 0 && (
          <Accordion>
            {data.users.map((item: any) => (
              <Accordion.Item key={item.id} value={item.id.toString()}>
                <UserHeader item={item} />
                <UserDetails item={item} />
              </Accordion.Item>
            ))}
          </Accordion>
        )} */}
        {data?.users && data.users.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};
