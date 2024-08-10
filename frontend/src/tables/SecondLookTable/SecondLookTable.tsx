import secondLookService from "@/services/secondLookService";
import { Accordion, Drawer, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import SecondLookHeader from "@/headers/SecondLookHeader/SecondLookHeader";
import SecondLookDetails from "@/details/SecondLookDetails/SecondLookDetails";
import { PAGE_SIZE } from "@/constants";
import Filters from "@/components/Filters/Filters";
import Controls from "@/components/Controls/Controls";
import Badges from "@/components/Badges/Badges";

interface SecondLookTableProps {
  className?: string;
}

export default ({ className }: SecondLookTableProps) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["secondLooks", selectedProgram, pageNum],
    queryFn: () => {
      return secondLookService.searchSecondLook({
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
        shareUrl="/second-look/add"
        shareText="Share Second Look"
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
        {data?.secondLooks?.length > 0 && (
          <Accordion>
            {data.secondLooks.map((item: any) => (
              <Accordion.Item key={item.id} value={item.id.toString()}>
                <SecondLookHeader item={item} />
                <SecondLookDetails item={item} />
              </Accordion.Item>
            ))}
          </Accordion>
        )}
        {data?.secondLooks && data.secondLooks.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};
