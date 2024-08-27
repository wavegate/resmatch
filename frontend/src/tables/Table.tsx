import React, { useState, useMemo } from "react";
import { Accordion, Avatar, Drawer, Loader } from "@mantine/core";
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
import programName from "@/utils/programName";
import { generateGravatarUrl } from "@/utils/utils";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Details from "@/components/Details";
import Header from "@/components/Header";

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
          setPageNum={setPageNum}
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
        <Accordion variant="separated" className={`mt-6`}>
          {data?.items?.length > 0 &&
            data.items.map((datum: any, i: number) => {
              return (
                <Accordion.Item key={datum.id} value={datum.id.toString()}>
                  <Accordion.Control className={`bg-primary bg-opacity-10`}>
                    <Header
                      queryKey={queryKey}
                      key={datum.id}
                      i={i}
                      data={datum}
                      modelName={modelName}
                    />
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Details
                      queryKey={queryKey}
                      key={datum.id}
                      i={i}
                      data={datum}
                      modelName={modelName}
                    />
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
        </Accordion>
        {data?.items && data.items.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};

export default Table;
