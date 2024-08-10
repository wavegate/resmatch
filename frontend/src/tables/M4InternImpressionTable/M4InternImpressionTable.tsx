import m4InternImpressionService from "@/services/m4InternImpressionService";
import { Accordion, Drawer, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import M4InternImpressionHeader from "@/headers/M4InternImpressionHeader/M4InternImpressionHeader";
import M4InternImpressionDetails from "@/details/M4InternImpressionDetails/M4InternImpressionDetails";
import { PAGE_SIZE } from "@/constants";
import Filters from "@/components/Filters/Filters";
import Controls from "@/components/Controls/Controls";
import Badges from "@/components/Badges/Badges";

interface M4InternImpressionTableProps {
  className?: string;
}

export default ({ className }: M4InternImpressionTableProps) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["m4InternImpressions", selectedProgram, pageNum],
    queryFn: () => {
      return m4InternImpressionService.searchM4InternImpression({
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
        shareUrl="/m4-intern-impression/add"
        shareText="Share M4 Intern Impression"
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
        {data?.m4InternImpressions?.length > 0 && (
          <Accordion>
            {data.m4InternImpressions.map((item: any) => (
              <Accordion.Item key={item.id} value={item.id.toString()}>
                <M4InternImpressionHeader item={item} />
                <M4InternImpressionDetails item={item} />
              </Accordion.Item>
            ))}
          </Accordion>
        )}
        {data?.m4InternImpressions && data.m4InternImpressions.length === 0 && (
          <NoRecords />
        )}
      </div>
    </div>
  );
};
