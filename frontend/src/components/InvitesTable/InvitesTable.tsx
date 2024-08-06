import inviteService from "@/services/inviteService";
import {
  Button,
  Pagination,
  Accordion,
  Avatar,
  Drawer,
  Text,
  Loader,
  Badge,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState, useMemo } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import { PAGE_SIZE } from "@/constants";
import useUser from "@/hooks/useUser";
import NoRecords from "@/components/NoRecords/NoRecords";
import {
  FaHome,
  FaMapMarkerAlt,
  FaPassport,
  FaPlane,
  FaRegCalendarAlt,
  FaSignal,
  FaSuitcaseRolling,
} from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import ItemDetails from "@/components/InviteDetails/InviteDetails";

interface InvitesTableProps {
  className?: string;
}

interface Filter {
  field: string;
  value: string;
  label: string;
}

export default ({ className }: InvitesTableProps) => {
  const { user } = useUser();
  const [selectedProgram, setSelectedProgram] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pageNum, setPageNum] = useState(1); // State for the current page number

  const { data, error, isLoading } = useQuery({
    queryKey: ["invites", selectedProgram, startDate, endDate, pageNum],
    queryFn: () => {
      return inviteService.searchInvite({
        programId: selectedProgram?.id,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
        pageNum, // Include the page number in the fetch request
      });
    },
  });

  const clearFilters = () => {
    setSelectedProgram(null);
    setPageNum(1); // Reset to the first page
  };

  const items = useMemo(() => {
    if (data) {
      return data.interviewInvites?.map((item: any) => {
        return (
          <Accordion.Item key={item.id} value={item.id.toString()}>
            <Accordion.Control className={`pl-0`}>
              <div className="grid grid-cols-[80px,60px,1fr] max-sm:grid-cols-[80px,1fr] gap-4">
                <div className="flex flex-col justify-center items-center text-gray-700 border border-solid rounded">
                  <Text className="text-lg font-medium">
                    {dayjs(item.inviteDateTime).format("MMM D")}
                  </Text>
                  <Text c="dimmed" className="text-xs">
                    {dayjs(item.inviteDateTime).format("YYYY")}
                  </Text>
                </div>
                <div
                  className={`flex items-center justify-center max-sm:hidden`}
                >
                  <img
                    className={`object-cover h-full`}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDSi-o3c7GQB3mphyLYYIsD8m5xiZ4dDTzNg&s"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Text className="text-sm sm:text-md md:text-lg font-medium">
                    {`${item.program.name} at ${item.program.institution.name}`}
                  </Text>
                  <div className={`flex items-center gap-2`}>
                    <Avatar size="sm" />
                    {item.anonymous ? (
                      <Text c="dimmed" className="text-xs sm:text-sm">
                        Anonymous
                      </Text>
                    ) : (
                      <Link to={`/user/${item.user.id}`}>
                        <Text
                          c="dimmed"
                          className="text-xs sm:text-sm underline"
                        >
                          {item.user.alias}
                        </Text>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Accordion.Control>
            <Accordion.Panel>
              {" "}
              <ItemDetails item={item} />
            </Accordion.Panel>
          </Accordion.Item>
        );
      });
    }
  }, [data]);

  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  const totalPages = useMemo(() => {
    if (data) {
      const totalCount = data?.totalCount || 0;
      const totalPages = Math.ceil(totalCount / PAGE_SIZE);
      return totalPages;
    }
  }, [data?.totalCount]);

  const filtersPresent = useMemo(() => {
    if (startDate || endDate || selectedProgram) {
      return true;
    } else {
      return false;
    }
  }, [startDate, endDate, selectedProgram]);

  return (
    <div className={`${className}`}>
      <Drawer opened={opened} onClose={close} title="Filters" position="bottom">
        <div className={`flex flex-col gap-3 items-start`}>
          <Button onClick={clearFilters}>Clear Filters</Button>
          <DatePickerInput
            label="Pick start date"
            placeholder="Pick start date"
            value={startDate}
            onChange={setStartDate}
            clearable
            size="md"
            leftSection={<FaRegCalendarAlt />}
            maxDate={endDate ? dayjs(endDate).toDate() : undefined}
          />
          <DatePickerInput
            label="Pick end date"
            placeholder="Pick end date"
            value={endDate}
            onChange={setEndDate}
            clearable
            size="md"
            leftSection={<FaRegCalendarAlt />}
            minDate={startDate ? dayjs(startDate).toDate() : undefined}
          />
          <ProgramSearch
            onProgramSelect={(value) => {
              setSelectedProgram(value);
            }}
            selected={selectedProgram?.id}
          />
        </div>
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
        <div className="inline-flex gap-1 mt-2">
          {startDate && !endDate && (
            <Badge
              variant="outline"
              rightSection={<IoMdClose onClick={() => setStartDate(null)} />}
            >
              {`After ${dayjs(startDate).format("M/DD/YYYY")}`}
            </Badge>
          )}
          {!startDate && endDate && (
            <Badge
              variant="outline"
              rightSection={<IoMdClose onClick={() => setEndDate(null)} />}
            >
              {`Before ${dayjs(endDate).format("M/DD/YYYY")}`}
            </Badge>
          )}
          {startDate && endDate && (
            <Badge
              variant="outline"
              rightSection={
                <IoMdClose
                  onClick={() => {
                    setStartDate(null);
                    setEndDate(null);
                  }}
                />
              }
            >
              {`${dayjs(startDate).format("M/DD/YYYY")} - ${dayjs(
                endDate
              ).format("M/DD/YYYY")}`}
            </Badge>
          )}
          {selectedProgram && (
            <Badge
              variant="outline"
              rightSection={
                <IoMdClose onClick={() => setSelectedProgram(null)} />
              }
            >
              {`${selectedProgram.name} at ${selectedProgram.institution.name}`}
            </Badge>
          )}
        </div>
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
