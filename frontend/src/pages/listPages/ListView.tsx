import { useState, useMemo } from "react";
import { Accordion, Avatar, Drawer, Loader, TextInput } from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import NoRecords from "@/components/NoRecords/NoRecords";
import { PAGE_SIZE } from "@/constants";
import Filters from "@/components/Filters/Filters";
import Controls from "@/components/Controls/Controls";
import Badges from "@/components/Badges/Badges";
import services from "@/services/services";
import { pageDescription } from "@/schemas/pageDescription";
import Details from "@/components/Details";
import Header from "@/components/Header";
import { Virtuoso } from "react-virtuoso";

interface TableProps {
  modelName: string;
  className?: string;
}

const flattenObject = (obj, prefix = "") => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key] != null ? obj[key].toString() : ""; // Convert to string if it's not null
    }
    return acc;
  }, {});
};

const searchItems = (items, searchTerm) => {
  return items.filter((item) => {
    // Flatten the object
    const flatItem = flattenObject(item);

    // Check if any value contains the search term (case insensitive)
    return Object.values(flatItem).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
};

const Table: React.FC<TableProps> = ({ modelName, className }) => {
  // const [selectedProgram, setSelectedProgram] = useState(null);
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // const [pageNum, setPageNum] = useState(1);

  // const queryKey = [modelName, selectedProgram, startDate, endDate, pageNum];

  // const { data, error, isLoading } = useQuery({
  //   queryKey,
  //   queryFn: () => {
  //     return services[modelName].search({
  //       programId: selectedProgram?.id,
  //       startDate: startDate ? startDate.toISOString() : undefined,
  //       endDate: endDate ? endDate.toISOString() : undefined,
  //       pageNum,
  //     });
  //   },
  // });
  const queryKey = [modelName, "all"];
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => services[modelName].getAll(),
  });

  // const clearFilters = () => {
  //   setStartDate(null);
  //   setEndDate(null);
  //   setSelectedProgram(null);
  //   setPageNum(1);
  // };

  // const [opened, { open, close }] = useDisclosure(false);

  // const totalPages = useMemo(() => {
  //   if (data) {
  //     const totalCount = data?.totalCount || 0;
  //     return Math.ceil(totalCount / PAGE_SIZE);
  //   }
  // }, [data?.totalCount]);

  // const filtersPresent = useMemo(() => {
  //   return startDate || endDate || selectedProgram;
  // }, [startDate, endDate, selectedProgram]);

  // const labels = pageDescription[modelName];
  const [searchText, setSearchText] = useState("");
  const [search] = useDebouncedValue(searchText, 200);

  const filteredResults = useMemo(() => {
    if (!data?.items || search.trim() === "") return data?.items || [];

    // Use the custom search function to filter results
    return searchItems(data.items, search);
  }, [data, search]);

  const renderItem = (index) => {
    const datum = filteredResults[index];
    return (
      <div
        key={datum.id}
        className={`border border-solid rounded-sm ${index > 0 ? "mt-4" : ""}`}
      >
        <Header
          queryKey={queryKey}
          i={index}
          data={datum}
          modelName={modelName}
        />
        <Details
          queryKey={queryKey}
          i={index}
          data={datum}
          modelName={modelName}
        />
      </div>
    );
  };

  return (
    <div className={`mt-2 flex-1`}>
      {/* <Drawer opened={opened} onClose={close} title="Filters" position="bottom">
        <Filters
          modelName={modelName}
          selectedProgram={selectedProgram}
          setSelectedProgram={setSelectedProgram}
          clearFilters={clearFilters}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setPageNum={setPageNum}
        />
      </Drawer> */}
      {/* 
      <Controls
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPages={totalPages}
        openFilters={open}
        shareUrl={`/${modelName}/add`}
        shareText={`Share ${labels.singular}`}
        noShare
      /> */}

      {/* {filtersPresent && (
        <Badges
          startDate={startDate}
          endDate={endDate}
          selectedProgram={selectedProgram}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setSelectedProgram={setSelectedProgram}
          setPageNum={setPageNum}
        />
      )} */}

      {isLoading && (
        <div className={`flex flex-col items-center`}>
          <Loader color="blue" className={`mt-12`} />
        </div>
      )}
      {!!data?.items?.length && (
        <div className={`h-full flex flex-col`}>
          <TextInput
            size="md"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.currentTarget.value);
            }}
            className={`mb-2`}
          />
          <div className={`flex flex-col gap-4 flex-1`}>
            <Virtuoso
              style={{ height: "100%" }} // Adjust the height as needed
              totalCount={filteredResults.length} // Total number of items
              itemContent={renderItem} // Function to render each item
            />
            {/* {filteredResults?.length > 0 &&
            filteredResults.map((datum: any, i: number) => {
              return (
                <div
                  key={datum.id}
                  className={`border border-solid rounded-sm`}
                >
                  <Header
                    queryKey={queryKey}
                    i={i}
                    data={datum}
                    modelName={modelName}
                  />

                  <Details
                    queryKey={queryKey}
                    i={i}
                    data={datum}
                    modelName={modelName}
                  />
                </div>
              );
            })} */}
          </div>
        </div>
      )}

      {data?.items && data.items.length === 0 && <NoRecords />}
    </div>
  );
};

export default Table;
