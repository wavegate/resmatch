import inviteService from "@/services/inviteService";
import { Accordion, Drawer, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import InviteHeader from "@/headers/InviteHeader/InviteHeader";
import InviteDetails from "@/details/InviteDetails/InviteDetails";
import InviteFilters from "@/filters/InviteFilters/InviteFilters";
import InviteBadges from "@/badges/InviteBadges/InviteBadges";
import NoRecords from "@/components/NoRecords/NoRecords";
import Controls from "@/components/Controls/Controls";
import { PAGE_SIZE } from "@/constants";

interface InviteTableProps {
  className?: string;
}

export default ({ className }: InviteTableProps) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["invite", selectedProgram, startDate, endDate, pageNum],
    queryFn: () => {
      return inviteService.searchInvite({
        programId: selectedProgram?.id,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
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
    return startDate || endDate || selectedProgram;
  }, [startDate, endDate, selectedProgram]);

  return (
    <div className={`${className}`}>
      <Drawer opened={opened} onClose={close} title="Filters" position="bottom">
        <InviteFilters
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setSelectedProgram={setSelectedProgram}
          selectedProgram={selectedProgram}
          clearFilters={clearFilters}
        />
      </Drawer>

      <Controls
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPages={totalPages}
        openFilters={open}
        shareUrl="/invite/add"
        shareText="Share Invite"
      />

      {filtersPresent && (
        <InviteBadges
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
        {data?.interviewInvites?.length > 0 && (
          <Accordion>
            {data.interviewInvites.map((item: any) => (
              <Accordion.Item key={item.id} value={item.id.toString()}>
                <InviteHeader item={item} />
                <InviteDetails item={item} />
              </Accordion.Item>
            ))}
          </Accordion>
        )}
        {data?.interviewInvites && data.interviewInvites.length === 0 && (
          <NoRecords />
        )}
      </div>
    </div>
  );
};
