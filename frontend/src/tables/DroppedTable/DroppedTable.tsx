import { Accordion, Drawer, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import DroppedHeader from "@/headers/DroppedHeader/DroppedHeader";
import DroppedDetails from "@/details/DroppedDetails/DroppedDetails";
import { PAGE_SIZE } from "@/constants";
import Filters from "@/components/Filters/Filters";
import Controls from "@/components/Controls/Controls";
import Badges from "@/components/Badges/Badges";
import droppedService from "@/services/droppedService";

interface DroppedTableProps {
  className?: string;
}

export default function DroppedTable({ className }: DroppedTableProps) {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["dropped", selectedProgram, pageNum],
    queryFn: () => {
      return droppedService.searchDropped({
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
        shareUrl="/dropped/add"
        shareText="Share Dropped"
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
        {data?.droppedRecords?.length > 0 && (
          <Accordion>
            {data.droppedRecords.map((item: any) => (
              <Accordion.Item key={item.id} value={item.id.toString()}>
                <DroppedHeader item={item} />
                <DroppedDetails item={item} />
              </Accordion.Item>
            ))}
          </Accordion>
        )}
        {data?.droppedRecords && data.droppedRecords.length === 0 && (
          <NoRecords />
        )}
      </div>
    </div>
  );
}
