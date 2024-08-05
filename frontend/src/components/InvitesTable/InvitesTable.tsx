import inviteService from "@/services/inviteService";
import {
  Button,
  Pagination,
  LoadingOverlay,
  Accordion,
  Avatar,
  Drawer,
  Text,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState, useMemo } from "react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ProgramSearch from "../ProgramSearch/ProgramSearch";
import { PAGE_SIZE } from "@/constants";
import useUser from "@/hooks/useUser";

interface InvitesTableProps {
  className?: string;
}

export default ({ className }: InvitesTableProps) => {
  const { user } = useUser();
  const [selectedProgramId, setSelectedProgramId] = useState();
  const [dateRange, setDateRange] = useState([null, null]);
  const [pageNum, setPageNum] = useState(1); // State for the current page number

  const { data, error, isLoading } = useQuery({
    queryKey: ["invites", selectedProgramId, dateRange, pageNum],
    queryFn: () => {
      const [startDate, endDate] = dateRange;
      return inviteService.searchInvite({
        programId: selectedProgramId,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
        pageNum, // Include the page number in the fetch request
      });
    },
  });

  const clearFilters = () => {
    setDateRange([null, null]);
    setSelectedProgramId(null);
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
                    <Text c="dimmed" className="text-xs sm:text-sm underline">
                      {item.user.alias}
                    </Text>
                  </div>
                </div>
              </div>
            </Accordion.Control>
            <Accordion.Panel>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <strong>Graduate Type:</strong> {item.graduateType || "N/A"}
                </div>
                <div>
                  <strong>IMG:</strong> {item.img || "N/A"}
                </div>
                <div>
                  <strong>Medical Degree:</strong> {item.medicalDegree}
                </div>
                <div>
                  <strong>Step 1 Score:</strong>{" "}
                  {item.step1Score || (item.step1ScorePass ? "Pass" : "N/A")}
                </div>
                <div>
                  <strong>Step 2 Score:</strong> {item.step2Score || "N/A"}
                </div>
                <div>
                  <strong>COMLEX 1 Score Pass:</strong>{" "}
                  {item.comlex1ScorePass ? "Yes" : "No"}
                </div>
                <div>
                  <strong>COMLEX 2 Score:</strong> {item.comlex2Score || "N/A"}
                </div>
                <div>
                  <strong>Geographic Preference:</strong>{" "}
                  {item.geographicPreference ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Signal Sent:</strong> {item.signal ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Visa Required:</strong>{" "}
                  {item.visaRequired ? "Yes" : "No"}
                </div>
                <div>
                  <strong>SubI:</strong> {item.subI ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Home Program:</strong> {item.home ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Away Rotation:</strong> {item.away ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Year of Graduation:</strong>{" "}
                  {item.yearOfGraduation || "N/A"}
                </div>
                <div>
                  <strong>Green Card:</strong> {item.greenCard ? "Yes" : "No"}
                </div>
              </div>
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

  return (
    <div className={`${className}`}>
      <Drawer opened={opened} onClose={close} title="Filters" position="bottom">
        <div className={`flex flex-col gap-3 items-start`}>
          <Button onClick={clearFilters}>Clear Filters</Button>
          <DatePickerInput
            type="range"
            label="Pick dates range"
            placeholder="Pick dates range"
            value={dateRange}
            onChange={setDateRange}
            clearable
          />
          <ProgramSearch
            onProgramSelect={setSelectedProgramId}
            selected={selectedProgramId}
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
                navigate("/invites/add");
              }}
              leftSection={<IoMdAdd size={18} />}
            >
              Add Invite
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
                navigate("/invites/add");
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
      <div className={`relative`} style={{ minHeight: "200px" }}>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 1 }}
        />
        {data?.interviewInvites?.length === 0 && (
          <Text c="dimmed" size="sm">
            No data found...
          </Text>
        )}
        {data?.interviewInvites?.length > 0 && <Accordion>{items}</Accordion>}
      </div>
    </div>
  );
};
