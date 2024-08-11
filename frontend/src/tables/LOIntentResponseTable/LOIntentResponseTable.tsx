import { Accordion, Drawer, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import LOIResponseHeader from "@/headers/LOIResponseHeader/LOIResponseHeader";
import LOIResponseDetails from "@/details/LOIResponseDetails/LOIResponseDetails";
import { PAGE_SIZE } from "@/constants";
import Filters from "@/components/Filters/Filters";
import Controls from "@/components/Controls/Controls";
import Badges from "@/components/Badges/Badges";
import loiResponseService from "@/services/loiResponseService";

interface LOIResponseTableProps {
  className?: string;
}

export default ({ className }: LOIResponseTableProps) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["lointentResponse", selectedProgram, pageNum],
    queryFn: () => {
      return loiResponseService.searchLOIResponse({
        programId: selectedProgram?.id,
        pageNum,
        intent: true,
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
        shareUrl="/lointent-response/add"
        shareText="Share LOI Response"
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
        {data?.loiResponses?.length > 0 && (
          <Accordion>
            {data.loiResponses.map((item: any) => (
              <Accordion.Item key={item.id} value={item.id.toString()}>
                <LOIResponseHeader item={item} />
                <LOIResponseDetails item={item} />
              </Accordion.Item>
            ))}
          </Accordion>
        )}
        {data?.loiResponses && data.loiResponses.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};
