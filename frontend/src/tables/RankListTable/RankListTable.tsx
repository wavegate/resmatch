import rankListService from "@/services/rankListService";
import { Accordion, Drawer, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import RankListHeader from "@/headers/RankListHeader/RankListHeader";
import RankListDetails from "@/details/RankListDetails/RankListDetails";
import { PAGE_SIZE } from "@/constants";
import Filters from "@/components/Filters/Filters";
import Controls from "@/components/Controls/Controls";
import Badges from "@/components/Badges/Badges";

interface RankListTableProps {
  className?: string;
  type: "MD" | "DO" | "IMG";
}

export default ({ className, type }: RankListTableProps) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: [
      `rankList-${type.toLowerCase()}`,
      selectedProgram,
      pageNum,
      type,
    ],
    queryFn: () => {
      const filters: any = {
        programId: selectedProgram?.id,
        pageNum,
      };

      if (type === "MD") {
        filters.graduateType = "US";
        filters.medicalDegree = "MD";
      } else if (type === "DO") {
        filters.graduateType = "US";
        filters.medicalDegree = "DO";
      } else if (type === "IMG") {
        filters.graduateType = "IMG";
      }

      return rankListService.searchRankList(filters);
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

  const shareUrl = useMemo(() => {
    if (type === "MD") return "/rank-list-md/add";
    if (type === "DO") return "/rank-list-do/add";
    return "/rank-list-img/add";
  }, [type]);

  const shareText = useMemo(() => {
    if (type === "MD") return "Share MD Rank List";
    if (type === "DO") return "Share DO Rank List";
    return "Share IMG Rank List";
  }, [type]);

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
        shareUrl={shareUrl}
        shareText={shareText}
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
        {data?.rankLists?.length > 0 && (
          <Accordion variant="separated" className={`mt-6`}>
            {data.rankLists.map((item: any) => (
              <Accordion.Item key={item.id} value={item.id.toString()}>
                <RankListHeader type={type} item={item} />
                <RankListDetails type={type} item={item} />
              </Accordion.Item>
            ))}
          </Accordion>
        )}
        {data?.rankLists && data.rankLists.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};
