import { Loader, Switch, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useMemo } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import { columnDefs } from "./columns";
import { AgGridReact } from "ag-grid-react";
import programService from "@/services/programService";

export default ({ showAll }: { showAll: boolean }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["programs", "all"],
    queryFn: () => {
      return programService.getAllProgramsInfo();
    },
  });

  const programs = useMemo(() => {
    if (data) {
      if (!showAll) {
        return data.programs.filter((item: any) =>
          /C\d$/.test(item.nrmpProgramCode)
        );
      }
      return data.programs;
    }
    return [];
  }, [data, showAll]);

  const [searchText, setSearchText] = useState("");
  const gridRef = useRef(null);

  const onFilterTextBoxChanged = (value) => {
    if (gridRef.current) {
      gridRef.current.api.setGridOption("quickFilterText", value);
    }
  };

  return (
    <div className={`mt-2`}>
      {isLoading && (
        <div className={`flex flex-col items-center`}>
          <Loader color="blue" className={`mt-12`} />
        </div>
      )}

      <TextInput
        size="md"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.currentTarget.value);
          onFilterTextBoxChanged(e.currentTarget.value);
        }}
        className={`mb-2`}
      />
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={programs} columnDefs={columnDefs} ref={gridRef} />
      </div>
      <div className={`mt-4`}>
        Showing {programs?.length} of {programs?.length} programs
      </div>
      {programs && programs.length === 0 && <NoRecords />}
    </div>
  );
};
