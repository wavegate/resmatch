import inviteService from "@/services/inviteService";
import programService from "@/services/programService";
import { useQuery } from "@tanstack/react-query";
import { Loader, TextInput, Card, Text } from "@mantine/core";
import { useMemo, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import programName from "@/utils/programName";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SpotsLeft = () => {
  const gridRef = useRef<any>();
  const [searchText, setSearchText] = useState("");
  const onFilterTextBoxChanged = (value: string) => {
    if (gridRef.current) {
      gridRef.current.api.setGridOption("quickFilterText", value);
    }
  };

  // Fetch the program spots left data
  const {
    data: programsMinSpotsData,
    error: programsMinSpotsError,
    isLoading: isProgramsMinSpotsLoading,
  } = useQuery({
    queryKey: ["programs-min-invite-spots"],
    queryFn: () => inviteService.getProgramsMinInviteSpots(),
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

  const rowData = useMemo(() => {
    if (allPrograms && programsMinSpotsData) {
      return programsMinSpotsData?.map((program: any) => {
        const programDetails = allPrograms[program.programId];
        const programDisplayName = programDetails
          ? programName(programDetails)
          : "Unknown Program";

        return {
          programId: program.programId, // Add programId for the link
          programName: programDisplayName,
          spotsLeft: program.minSpotsLeft,
          date: program.date
            ? new Date(program.date).toLocaleDateString()
            : "Unknown Date",
        };
      });
    }
    return [];
  }, [programsMinSpotsData, allPrograms]);

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
        headerName: "Spots Left",
        field: "spotsLeft",
        sortable: true,
        filter: true,
        resizable: true,
      },
      {
        headerName: "Invite Date",
        field: "date",
        sortable: true,
        filter: true,
        resizable: true,
      },
    ],
    []
  );

  // Loading states
  if (isProgramsMinSpotsLoading || allProgramsLoading) {
    return <Loader />;
  }

  // Error handling
  if (programsMinSpotsError || allProgramsError) {
    return <div>Error loading data</div>;
  }

  return (
    <Card shadow="sm" radius="lg" withBorder>
      <div className="flex flex-col">
        <Text className="text-xl font-medium">Spots Left</Text>
        <Text className="text-gray-500 text-sm mb-4">
          The lowest number of reported spots left for each program.
        </Text>
        <TextInput
          size="md"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.currentTarget.value);
            onFilterTextBoxChanged(e.currentTarget.value);
          }}
          className="mb-2"
        />
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

export default SpotsLeft;
