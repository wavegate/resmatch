import { useState, useMemo } from "react";
import { Loader, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import NoRecords from "@/components/NoRecords/NoRecords";
import services from "@/services/services";
import Details from "@/components/Details";
import Header from "@/components/Header";
import { Virtuoso } from "react-virtuoso";
import useUser from "@/hooks/useUser";

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

const Table: React.FC<TableProps> = ({
  modelName,
  className,
  showFollowed,
  showOldData,
}) => {
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
  const queryKey = [modelName, "all", showOldData];
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => {
      return services[modelName].getAll({ oldData: showOldData });
    },
  });

  const { user } = useUser();

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
    if (!data?.items) return [];

    // Get followed program IDs from user if showFollowed is true
    const followedProgramIds = user?.followedPrograms || [];

    // Filter by followed programs first if showFollowed is true
    const filteredByFollowed = showFollowed
      ? data.items.filter((item) => {
          if (modelName === "xorY") {
            // Check both item.programXId and item.programYId for xorY model
            return followedProgramIds.some(
              (x) => x.id === item.programXId || x.id === item.programYId
            );
          } else {
            // Default check for item.programId
            return followedProgramIds.some((x) => x.id === item.programId);
          }
        })
      : data.items;

    // Now apply the search filter to the followed items (if showFollowed is true) or all items
    if (search.trim() === "") return filteredByFollowed;

    return searchItems(filteredByFollowed, search);
  }, [data, search, showFollowed, user, modelName]);

  const renderItem = (index) => {
    const datum = filteredResults[index];
    return (
      <div
        key={datum.id}
        className={`border border-solid rounded-lg overflow-hidden ${
          index > 0 ? "mt-2" : ""
        }`}
      >
        <Header queryKey={queryKey} data={datum} modelName={modelName} />
        <Details queryKey={queryKey} data={datum} modelName={modelName} />
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
        {!!filteredResults.length && (
          <div className={`flex flex-col gap-4 flex-1`}>
            <Virtuoso
              style={{ height: "100%" }} // Adjust the height as needed
              totalCount={filteredResults.length} // Total number of items
              itemContent={renderItem} // Function to render each item
            />
          </div>
        )}
        {filteredResults && filteredResults.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};

export default Table;
