import logisticsService from "@/services/logisticsService";
import { Accordion, Drawer, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import LogisticsHeader from "@/headers/LogisticsHeader/LogisticsHeader";
import { PAGE_SIZE } from "@/constants";
import Filters from "@/components/Filters/Filters";
import Controls from "@/components/Controls/Controls";
import Badges from "@/components/Badges/Badges";
import LogisticsDetails from "@/details/LogsiticsDetails/LogisticsDetails";

interface LogisticsTableProps {
  className?: string;
}

export default ({ className }: LogisticsTableProps) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["logistics", selectedProgram, pageNum],
    queryFn: () => {
      return logisticsService.searchLogistics({
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
        shareUrl="/logistics/add"
        shareText="Share Logistics"
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
        {data?.interviewLogistics?.length > 0 && (
          <Accordion>
            {data.interviewLogistics.map((item: any) => (
              <Accordion.Item key={item.id} value={item.id.toString()}>
                <LogisticsHeader item={item} />
                <LogisticsDetails item={item} />
              </Accordion.Item>
            ))}
          </Accordion>
        )}
        {data?.interviewLogistics && data.interviewLogistics.length === 0 && (
          <NoRecords />
        )}
      </div>
    </div>
  );
};
