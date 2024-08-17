import React, { useState, useMemo } from "react";
import { Drawer, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import NoRecords from "@/components/NoRecords/NoRecords";
import { PAGE_SIZE } from "@/constants";
import Filters from "@/components/Filters/Filters";
import Controls from "@/components/Controls/Controls";
import Badges from "@/components/Badges/Badges";
import DataDisplay from "@/headers/DataDisplay";
import services from "@/services/services";
import { pageDescription } from "@/schemas/pageDescription";

interface TableProps {
  modelName: string;
  className?: string;
}

const Table: React.FC<TableProps> = ({ modelName, className }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const queryKey = [modelName, selectedProgram, startDate, endDate, pageNum];

  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => {
      return services[modelName].search({
        programId: selectedProgram?.id,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
        pageNum,
      });
    },
  });

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
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
    return startDate || endDate || selectedProgram;
  }, [startDate, endDate, selectedProgram]);

  const labels = pageDescription[modelName];

  return (
    <div className={`${className}`}>
      <Drawer opened={opened} onClose={close} title="Filters" position="bottom">
        <Filters
          modelName={modelName}
          selectedProgram={selectedProgram}
          setSelectedProgram={setSelectedProgram}
          clearFilters={clearFilters}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Drawer>

      <Controls
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPages={totalPages}
        openFilters={open}
        shareUrl={`/${modelName}/add`}
        shareText={`Share ${labels.singular}`}
      />

      {filtersPresent && (
        <Badges
          startDate={startDate}
          endDate={endDate}
          selectedProgram={selectedProgram}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setSelectedProgram={setSelectedProgram}
        />
      )}
      <div className={`mt-2`}>
        {isLoading && (
          <div className={`flex flex-col items-center`}>
            <Loader color="blue" className={`mt-12`} />
          </div>
        )}
        <div className={`flex flex-col gap-4 mt-4`}>
          {data?.items?.length > 0 &&
            data.items.map((datum: any, i: number) => {
              return (
                <DataDisplay
                  queryKey={queryKey}
                  key={datum.id}
                  i={i}
                  data={datum}
                  modelName={modelName}
                />
              );
            })}
        </div>
        {data?.items && data.items.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};

export default Table;
