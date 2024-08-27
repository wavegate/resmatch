import userService from "@/services/userService";
import { Accordion, Drawer, Loader, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useRef } from "react";
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
import { AgGridReact } from "ag-grid-react";
import { columnDefs } from "./columns";

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

  const [searchText, setSearchText] = useState("");
  const gridRef = useRef(null);

  const onFilterTextBoxChanged = (value) => {
    if (gridRef.current) {
      gridRef.current.api.setGridOption("quickFilterText", value);
    }
  };

  return (
    <div className={`${className}`}>
      <Drawer opened={opened} onClose={close} title="Filters" position="bottom">
        <Filters
          selectedProgram={selectedProgram}
          setSelectedProgram={setSelectedProgram}
          clearFilters={clearFilters}
        />
      </Drawer>

      {/* <Controls
        noFilters
        noShare
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPages={totalPages}
        openFilters={open}
        shareUrl="/user/add"
        shareText="Share User"
      /> */}

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
          <AgGridReact
            rowData={data?.users}
            columnDefs={columnDefs}
            ref={gridRef}
          />
        </div>
        {/* <DataTable
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
        /> */}
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
