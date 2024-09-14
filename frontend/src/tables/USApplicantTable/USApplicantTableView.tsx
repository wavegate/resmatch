import { Button, Loader, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState, forwardRef, useMemo } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import { AgGridReact } from "@ag-grid-community/react";
import { columnDefs } from "./columns";
import classNames from "classnames";
import { MdCloseFullscreen, MdOutlineOpenInFull } from "react-icons/md";
import userService from "@/services/userService";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { CsvExportModule } from "@ag-grid-community/csv-export";

const TableView = forwardRef(({}, ref) => {
  const [fullScreen, setFullScreen] = useState(false);
  const { data, error, isLoading } = useQuery({
    queryKey: ["user", "US"],
    queryFn: () => {
      return userService.searchUser({
        graduateType: "US",
      });
    },
  });

  const filteredUsers = useMemo(() => {
    return data?.users?.filter((user) => {
      return Object.keys(user).some(
        (key) =>
          ![
            "id",
            "alias",
            "createdAt",
            "isConfirmed",
            "updatedAt",
            "public",
            "graduateType",
            "googleId",
          ].includes(key) && user[key] !== null
      );
    });
  }, [data?.users]);

  const [searchText, setSearchText] = useState("");

  const onFilterTextBoxChanged = (value) => {
    if (ref.current) {
      ref.current.api.setGridOption("quickFilterText", value);
    }
  };

  return (
    <div className={`mt-2 flex-1`}>
      {isLoading && (
        <div className={`flex flex-col items-center`}>
          <Loader color="blue" className={`mt-12`} />
        </div>
      )}
      {!!filteredUsers?.length && (
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
          <div
            className={classNames(
              "ag-theme-quartz",
              "table-selector",
              "compact",
              "flex-1",
              {
                relative: !fullScreen,
                "max-size": fullScreen,
              }
            )}
          >
            <AgGridReact
              rowData={filteredUsers}
              columnDefs={columnDefs}
              ref={ref}
              enableCellTextSelection={true}
              ensureDomOrder={true}
              modules={[ClientSideRowModelModule, CsvExportModule]}
            />
            <Button
              className={`absolute bottom-6 right-6 max-sm:bottom-2 max-sm:right-2 px-3`}
              variant="default"
              onClick={() => setFullScreen((prev) => !prev)}
            >
              {fullScreen ? (
                <MdCloseFullscreen size={18} />
              ) : (
                <MdOutlineOpenInFull size={18} />
              )}
            </Button>
          </div>
        </div>
      )}
      {filteredUsers && filteredUsers.length === 0 && <NoRecords />}
    </div>
  );
});

export default TableView;
