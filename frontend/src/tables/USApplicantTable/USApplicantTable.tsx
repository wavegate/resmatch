import userService from "@/services/userService";
import {
  Drawer,
  Loader,
  SimpleGrid,
  Text,
  Box,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useRef } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import { PAGE_SIZE } from "@/constants";
import Filters from "@/components/Filters/Filters";
import Controls from "@/components/Controls/Controls";
import Badges from "@/components/Badges/Badges";
import userProfileFormSchema from "@/schemas/userProfileFormSchema";
import { fieldLabelMap } from "@/schemas/fieldLabelMap";
import { DataTable } from "mantine-datatable";
import { showNotification } from "@mantine/notifications";
import { Link } from "react-router-dom";
import { columnDefs, columns } from "./columns";
import { AgGridReact } from "ag-grid-react";

interface UserTableProps {
  className?: string;
}

export default ({ className }: UserTableProps) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["user", "US", selectedProgram, pageNum],
    queryFn: () => {
      return userService.searchUser({
        programId: selectedProgram?.id,
        pageNum,
        graduateType: "US",
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
        <div className={`mt-4`}>
          Showing {data?.users?.length} of {data?.users?.length}
        </div>
        {/* <DataTable
          // withTableBorder
          borderRadius="sm"
          withColumnBorders
          striped
          // highlightOnHover
          // provide data
          records={data?.users}
          // define columns
          columns={columns}
          // execute this callback when a row is clicked
        /> */}
        {/* {data?.users?.length > 0 &&
          data.users.map((item: any) => {
            return (
              <SimpleGrid spacing="md" cols={{ base: 1, sm: 2 }} key={item.id}>
                {Object.keys(userProfileFormSchema).map((fieldName, index) => {
                  const fieldSchema = userProfileFormSchema[fieldName];
                  let displayValue: React.ReactNode = "-";

                  if (
                    item[fieldName] !== undefined &&
                    item[fieldName] !== null
                  ) {
                    switch (fieldSchema.type) {
                      case "boolean":
                        displayValue = item[fieldName] ? "Yes" : "No";
                        break;
                      case "date":
                        displayValue = new Date(
                          item[fieldName]
                        ).toLocaleDateString();
                        break;
                      case "multipleDates":
                        displayValue = Array.isArray(item[fieldName])
                          ? item[fieldName]
                              .map((date: string) =>
                                new Date(date).toLocaleDateString()
                              )
                              .join(", ")
                          : "-";
                        break;
                      case "select":
                        displayValue =
                          fieldLabelMap[fieldName]?.[item[fieldName]] ||
                          item[fieldName];
                        break;
                      case "array":
                        if (
                          fieldSchema.of === "string" &&
                          Array.isArray(item[fieldName])
                        ) {
                          displayValue = (
                            <ul>
                              {item[fieldName].map(
                                (item: string, idx: number) => (
                                  <li key={idx}>{item}</li>
                                )
                              )}
                            </ul>
                          );
                        } else {
                          displayValue = item[fieldName].join(", ");
                        }
                        break;
                      default:
                        displayValue = item[fieldName];
                    }
                  } else {
                    return false;
                  }

                  return (
                    <div key={fieldName} className={`flex flex-col gap-2`}>
                      <Text size="sm" w={500}>
                        {fieldSchema.label}:
                      </Text>
                      <Text size="sm">{displayValue}</Text>

                      <Text size="xs" c="dimmed">
                        {fieldSchema.description}
                      </Text>
                    </div>
                  );
                })}
              </SimpleGrid>
            );
          })} */}
        {data?.users && data.users.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};
