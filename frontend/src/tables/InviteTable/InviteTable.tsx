import inviteService from "@/services/inviteService";
import {
  Button,
  Pagination,
  Accordion,
  Drawer,
  Text,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "@/constants";
import useUser from "@/hooks/useUser";
import InviteHeader from "@/headers/InviteHeader/InviteHeader";
import InviteDetails from "@/details/InviteDetails/InviteDetails";
import InviteFilters from "@/filters/InviteFilters/InviteFilters";
import InviteBadges from "@/badges/InviteBadges/InviteBadges";
import NoRecords from "@/components/NoRecords/NoRecords";

interface InviteTableProps {
  className?: string;
}

export default ({ className }: InviteTableProps) => {
  const { user } = useUser();
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

  const items = useMemo(() => {
    if (data) {
      return data.interviewInvites?.map((item: any) => (
        <Accordion.Item key={item.id} value={item.id.toString()}>
          <InviteHeader item={item} />
          <InviteDetails item={item} />
        </Accordion.Item>
      ));
    }
  }, [data]);

  const navigate = useNavigate();
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
          opened={opened}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setSelectedProgram={setSelectedProgram}
          selectedProgram={selectedProgram}
          clearFilters={clearFilters}
        />
      </Drawer>
      <div
        className={`flex items-center gap-2 max-sm:items-start max-sm:flex-col max-sm:gap-4`}
      >
        <div className={`flex gap-2 items-center`}>
          <Button onClick={open} variant="outline">
            Filters
          </Button>
          {user && (
            <Button
              className={`sm:hidden`}
              onClick={() => {
                navigate("/invite/add");
              }}
              leftSection={<IoMdAdd size={18} />}
            >
              Share Invite
            </Button>
          )}
          <Pagination
            className={`max-sm:hidden`}
            value={pageNum}
            onChange={setPageNum}
            total={totalPages}
          />
        </div>
        <div className={`flex gap-2`}>
          {user && (
            <Button
              className={`max-sm:hidden`}
              onClick={() => {
                navigate("/invite/add");
              }}
              leftSection={<IoMdAdd size={18} />}
            >
              Add Invite
            </Button>
          )}
          <Pagination
            className={`sm:hidden`}
            value={pageNum}
            onChange={setPageNum}
            total={totalPages}
            boundaries={0}
          />
        </div>
      </div>
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
        {data?.interviewInvites?.length > 0 && <Accordion>{items}</Accordion>}
        {data?.interviewInvites && data.interviewInvites.length === 0 && (
          <NoRecords />
        )}
      </div>
    </div>
  );
};
