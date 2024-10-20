import inviteService from "@/services/inviteService";
import programService from "@/services/programService";
import { useQuery } from "@tanstack/react-query";
import { Loader, Card, Text } from "@mantine/core";
import { useMemo, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import programName from "@/utils/programName";
import { Link } from "react-router-dom";

const ProgramCompetitiveness = () => {
  const gridRef = useRef<any>();

  // Fetch the program competitiveness data
  const {
    data: programCompetitivenessData,
    error: programCompetitivenessError,
    isLoading: isProgramCompetitivenessLoading,
  } = useQuery({
    queryKey: ["program-competitiveness"],
    queryFn: () => inviteService.getProgramCompetitiveness(),
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
    if (allPrograms && programCompetitivenessData) {
      return programCompetitivenessData?.map((program: any) => {
        const programDetails = allPrograms[program.programId];
        const programDisplayName = programDetails
          ? programName(programDetails)
          : "Unknown Program";

        return {
          programId: program.programId,
          programName: programDisplayName,
          avgStep2Score: program.avgStep2Score
            ? program.avgStep2Score.toFixed(2)
            : "N/A",
        };
      });
    }
  }, [programCompetitivenessData, allPrograms]);

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
        headerName: "Average Step 2 Score",
        field: "avgStep2Score",
        sortable: true,
        filter: true,
        resizable: true,
      },
    ],
    []
  );

  // Loading states
  if (isProgramCompetitivenessLoading || allProgramsLoading) {
    return <Loader />;
  }

  // Error handling
  if (programCompetitivenessError || allProgramsError) {
    return <div>Error loading data</div>;
  }

  return (
    <Card shadow="sm" radius="lg" withBorder>
      <div className="flex flex-col">
        <Text className="text-xl font-medium">Most Competitive Programs</Text>
        <Text className="text-gray-500 text-sm mb-4">
          Top 10 programs with the highest average Step 2 scores.
        </Text>
        <div
          className="ag-theme-quartz table-selector compact"
          style={{ height: 410 }}
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

export default ProgramCompetitiveness;
