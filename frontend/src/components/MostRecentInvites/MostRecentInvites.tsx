import inviteService from "@/services/inviteService";
import programService from "@/services/programService";
import { useQuery } from "@tanstack/react-query";
import { Card, Loader, List, Text } from "@mantine/core";
import { useMemo } from "react";
import programName from "@/utils/programName";
import { Link } from "react-router-dom";

const MostRecentInvites = () => {
  // Fetch the last 10 programs that sent out invites
  const {
    data: last10ProgramsData,
    error: last10ProgramsError,
    isLoading: isLast10ProgramsLoading,
  } = useQuery({
    queryKey: ["last-10-programs"],
    queryFn: () => inviteService.getLast10Programs(),
  });

  // Fetch all programs and map them by programId
  const {
    data: allPrograms,
    error: allProgramsError,
    isLoading: allProgramsLoading,
  } = useQuery({
    queryKey: ["allPrograms"],
    queryFn: programService.getAllPrograms,
    staleTime: 30 * 60 * 1000,
    select: (allPrograms) =>
      allPrograms.reduce((acc, program) => {
        const { id, ...rest } = program;
        acc[id] = program;
        return acc;
      }, {}),
  });

  // Prepare the list data
  const programListItems = useMemo(() => {
    if (allPrograms && last10ProgramsData) {
      return last10ProgramsData.map((programId: string) => {
        const programDetails = allPrograms[programId];

        return (
          <List.Item key={programId}>
            <Link
              to={`/program/${programDetails?.id}/details`}
              className={`hover:underline`}
            >
              {programName(programDetails)}
            </Link>
          </List.Item>
        );
      });
    }
    return null;
  }, [last10ProgramsData, allPrograms]);

  // Loading states
  if (isLast10ProgramsLoading || allProgramsLoading) {
    return <Loader />;
  }

  // Error handling
  if (last10ProgramsError || allProgramsError) {
    return <div>Error loading data</div>;
  }

  return (
    <Card shadow="sm" radius="lg" withBorder>
      <div className={`flex flex-col`}>
        <Text className={`text-xl font-medium`}>Most Recent Invites</Text>
        <Text className={`text-gray-500 text-sm mb-4`}>
          The last 10 programs with reported invites.
        </Text>
        <List spacing="xs" className={`list-disc`} px="sm">
          {programListItems}
        </List>
      </div>
    </Card>
  );
};

export default MostRecentInvites;
