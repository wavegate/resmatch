import inviteService from "@/services/inviteService";
import programService from "@/services/programService";
import { useQuery } from "@tanstack/react-query";
import { Loader, Card, Text } from "@mantine/core";
import { useMemo, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import programName from "@/utils/programName";
import classNames from "classnames";
import { Link } from "react-router-dom";

const MostInvites = () => {
  const gridRef = useRef<any>();

  // Fetch the programs with the most invites data
  const {
    data: mostInvitesData,
    error: mostInvitesError,
    isLoading: isMostInvitesLoading,
  } = useQuery({
    queryKey: ["programs-with-most-invites"],
    queryFn: () => inviteService.getProgramsWithMostInvites(),
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

  // Prepare the row data for AG Grid
  const rowData = useMemo(() => {
    if (allPrograms && mostInvitesData) {
      return mostInvitesData?.map((program: any) => {
        const programDetails = allPrograms[program.programId];
        const programDisplayName = programDetails
          ? programName(programDetails)
          : "Unknown Program";

        return {
          programId: program.programId,
          programName: programDisplayName,
          totalInvites: program.totalInvites || "N/A",
        };
      });
    }
  }, [mostInvitesData, allPrograms]);

  // Define the column structure for AG Grid
  const columnDefs = useMemo(
    () => [
      {
        headerName: "Program Name",
        field: "programName",
        sortable: true,
        filter: true,
        resizable: true,
        cellRenderer: ({ data }: any) => {
          return (
            <Link
              to={`/program/${data.programId}/details`}
              className="hover:underline"
            >
              {data.programName}
            </Link>
          );
        },
      },
      {
        headerName: "Invites",
        field: "totalInvites",
        sortable: true,
        filter: true,
        resizable: true,
        width: 100,
      },
    ],
    []
  );

  // Loading states
  if (isMostInvitesLoading || allProgramsLoading) {
    return <Loader />;
  }

  // Error handling
  if (mostInvitesError || allProgramsError) {
    return <div>Error loading data</div>;
  }

  return (
    <Card shadow="sm" withBorder radius="lg">
      <div className="flex flex-col">
        <Text className="text-xl font-medium">
          Programs with the Most Invites
        </Text>
        <Text className="text-gray-500 text-sm mb-4">
          Top 10 programs that have the most reported invites.
        </Text>
        <div
          className={classNames("ag-theme-quartz", "table-selector", "compact")}
          style={{ height: 400, width: "100%" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            enableCellTextSelection={true}
            ensureDomOrder={true}
            modules={[ClientSideRowModelModule]}
          />
        </div>
      </div>
    </Card>
  );
};

export default MostInvites;
