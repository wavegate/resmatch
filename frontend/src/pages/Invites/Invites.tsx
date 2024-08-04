import { Accordion, Button, Drawer, LoadingOverlay, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import apiClient from "@/apiClient";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const fetchInvites = async (searchQuery) => {
  const { data } = await apiClient.post(
    `/interview-invites/search`,
    searchQuery
  );
  return data;
};

export default () => {
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["invites", selectedProgramId, dateRange],
    queryFn: () => {
      const [startDate, endDate] = dateRange;
      return fetchInvites({
        programId: selectedProgramId,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
      });
    },
  });

  const [opened, { open, close }] = useDisclosure(false);

  const clearFilters = () => {
    setDateRange([null, null]);
    setSelectedProgramId(null);
  };

  const items = useMemo(() => {
    if (data) {
      return data.map((item: any) => {
        return (
          <Accordion.Item key={item.id} value={item.id.toString()}>
            <Accordion.Control>
              <Text>
                <strong>{`${item.program.name} at ${item.program.institution.name}`}</strong>{" "}
                - {dayjs(item.inviteDateTime).format("MMMM D, YYYY")}
              </Text>
              <Text size="sm" color="gray">
                Posted By: {item.user.alias}
              </Text>
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

  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={`flex flex-col gap-2`}>
      <div className={`flex gap-2`}>
        <Button onClick={open} variant="light">
          View Filters
        </Button>
        <Button
          onClick={() => {
            navigate("/interview-invites/add");
          }}
        >
          Add Invite
        </Button>
      </div>
      <Drawer opened={opened} onClose={close} title="Filters" position="bottom">
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
      </Drawer>

      <div className={`relative`} style={{ minHeight: "200px" }}>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 1 }}
        />
        {data?.length === 0 && (
          <Text c="dimmed" size="sm">
            No data found...
          </Text>
        )}
        {data?.length > 0 && <Accordion>{items}</Accordion>}
      </div>
    </div>
  );
};
