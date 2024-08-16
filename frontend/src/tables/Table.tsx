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

interface TableProps {
  modelName: string;
  className?: string;
}

const Table: React.FC<TableProps> = ({ modelName, className }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  console.log(selectedProgram);
  console.log(modelName);

  const { data, error, isLoading } = useQuery({
    queryKey: [modelName, selectedProgram, pageNum],
    queryFn: () => {
      return services[modelName].search({
        programId: selectedProgram?.id,
        pageNum,
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

  return (
    <div className={`${className}`}>
      <Drawer opened={opened} onClose={close} title="Filters" position="bottom">
        <Filters
          selectedProgram={selectedProgram}
          setSelectedProgram={setSelectedProgram}
          clearFilters={clearFilters}
        />
      </Drawer>

      <Controls
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPages={totalPages}
        openFilters={open}
        shareUrl={`/${modelName}/add`}
        shareText={`Share ${modelName}`}
      />

      {filtersPresent && (
        <Badges
          selectedProgram={selectedProgram}
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
