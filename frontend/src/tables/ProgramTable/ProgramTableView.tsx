import { Loader, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, forwardRef } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import { columnDefs } from "./columns";
import { AgGridReact } from "@ag-grid-community/react";
import programService from "@/services/programService";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import "./styles.scss";
import useUser from "@/hooks/useUser";

const TableView = forwardRef(({ showAll }: { showAll: boolean }, ref) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["programs", "all"],
    queryFn: () => programService.getAllProgramsInfo(),
  });
  const { user } = useUser();

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

  const onFilterTextBoxChanged = (value) => {
    if (ref.current) {
      ref.current.api.setGridOption("quickFilterText", value);
    }
  };

  const columns = useMemo(() => {
    return columnDefs(user);
  }, [user]);

  return (
    <div className={`mt-2 flex-1`}>
      {isLoading && (
        <div className={`flex flex-col items-center`}>
          <Loader color="blue" className={`mt-12`} />
        </div>
      )}
      {!!programs?.length && (
        <div className={`h-full flex flex-col`}>
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
          <div className="ag-theme-quartz flex-1">
            <AgGridReact
              rowData={programs}
              columnDefs={columns}
              ref={ref}
              modules={[ClientSideRowModelModule, CsvExportModule]}
              enableCellTextSelection={true}
            />
          </div>
          {/* <div className={`mt-2 text-sm`}>
            Showing {programs?.length} of {programs?.length}
          </div> */}
        </div>
      )}
      {programs && programs.length === 0 && <NoRecords />}
    </div>
  );
});

export default TableView;
