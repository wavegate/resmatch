import { Accordion, Drawer, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import { PAGE_SIZE } from "@/constants";
import Controls from "@/components/Controls/Controls";
import Filters from "@/components/Filters/Filters";
import Badges from "@/components/Badges/Badges";
import XorYHeader from "@/headers/XorYHeader/XorYHeader";
import XorYDetails from "@/details/XorYDetails/XorYDetails";
import xOrYService from "@/services/xOrYService";

interface XorYTableProps {
  className?: string;
}

export default ({ className }: XorYTableProps) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["xOrY-img", selectedProgram, pageNum],
    queryFn: () => {
      return xOrYService.searchXorY({
        programId: selectedProgram?.id,
        pageNum,
        img: true,
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
        shareUrl="/x-or-y-img/add"
        shareText="Share Comparison"
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
        {data?.xOrYEntries?.length > 0 && (
          <Accordion>
            {data.xOrYEntries.map((item: any) => (
              <Accordion.Item key={item.id} value={item.id.toString()}>
                <XorYHeader item={item} />
                <XorYDetails item={item} />
              </Accordion.Item>
            ))}
          </Accordion>
        )}
        {data?.xOrYEntries && data.xOrYEntries.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};
